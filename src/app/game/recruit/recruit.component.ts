import { Component, OnChanges, OnDestroy, Input  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { GameDataService } from '../../services/game-data.service';
import { unitData } from '../staticData';
import { GameModuleState } from '../../store';
import { Town } from '../../store/town/town.model';
import { TownActions, Recruit } from '../../store/town/town.actions';
import { WorldData, Resources } from '../../world/world.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'recruit',
  templateUrl: './recruit.component.html',
  styleUrls: ['./recruit.component.scss'],
})
export class RecruitComponent implements OnChanges, OnDestroy {
  @Input() public town: Town;
  @Input() public worldData: WorldData;
  public unitDetails = unitData;
  public units;
  public unitData;
  public unitDataMap;
  public recruitment: {
    resources: Resources,
    resourcesAvailable: Resources,
    units: { [key: string]: number },
    population: number,
  } = {
    resources: {
      wood: null,
      clay: null,
      iron: null,
    },
    resourcesAvailable: {
      wood: null,
      clay: null,
      iron: null,
    },
    units: {},
    population: 0,
  };
  public hasRecruitmentQueue = false;
  public subscriptions = {
    gameData: null,
    currentTown: null,
    recruitEvents: null
  };
  public queue$: Observable<any>;
  public updateAvailability$: Subscription;

  constructor(
    private gameData: GameDataService,
    private store: Store<GameModuleState>,
  ) {}

  // TODO: update resources, either listen to resource events in an interval or
  // find the time when the next unit is available and update then
  ngOnChanges() {
    this.unitData = this.worldData.units;
    this.hasRecruitmentQueue = !!this.town.UnitQueues.length;
    this.town.availableResources$.pipe(
      take(1)
    ).subscribe((value) => {
        if (
          this.recruitment.resources.wood === this.recruitment.resourcesAvailable.wood &&
          this.recruitment.resources.clay === this.recruitment.resourcesAvailable.clay &&
          this.recruitment.resources.iron === this.recruitment.resourcesAvailable.iron
        ) {
          this.recruitment.resources = value;
          this.recruitment.resourcesAvailable = value;
          return;
        }
        const diff = {
          wood: value.wood - this.recruitment.resources.wood,
          clay: value.clay - this.recruitment.resources.clay,
          iron: value.iron - this.recruitment.resources.iron,
        };
        this.recruitment.resources = value;
        this.recruitment.resourcesAvailable.wood += diff.wood;
        this.recruitment.resourcesAvailable.clay += diff.clay;
        this.recruitment.resourcesAvailable.iron += diff.iron;

        // this.updateAvailability$ = Observable.timer(soonestAvailable).subscribe(() => this.ngOnChanges);
      });
  }

  ngOnDestroy() {
      // this.subscriptions.gameData.unsubscribe();
      // this.subscriptions.currentTown.unsubscribe();
      // this.subscriptions.recruitEvents.unsubscribe();
  }

  unitAmountUpdate($event, type) {
    $event = Math.max($event, 0) || 0;
    const change = $event - (this.recruitment.units[type] || 0);
    if (typeof $event === 'number') {
      const unitCosts = this.worldData.unitMap[type].costs;
      this.recruitment.resourcesAvailable['wood'] -= unitCosts.wood * change;
      this.recruitment.resourcesAvailable['clay'] -= unitCosts.clay * change;
      this.recruitment.resourcesAvailable['iron'] -= unitCosts.iron * change;
      this.recruitment.population = Math.max(this.recruitment.population + change, 0);
    }
    this.recruitment.units[type] = $event;
  }

  calculateMax(costs) {
    return Math.min.apply(null, [
      Math.floor(this.recruitment.resourcesAvailable['wood'] / costs.wood),
      Math.floor(this.recruitment.resourcesAvailable['clay'] / costs.clay),
      Math.floor(this.recruitment.resourcesAvailable['iron'] / costs.iron),
      Math.floor(this.town.population.available - this.recruitment.population),
    ]);
  }

  canRecruit(unit) {
    if (this.town._actionState.recruit || !this.town.population.available) {
      return false;
    }
    if (!unit.requirements || !this.town) {
      return true;
    }
    return unit.requirements.every(req => req.level <= this.town.buildings[req.item].level);
  }

  recruit(amount, type) {
    this.store.dispatch(new Recruit([{ type, amount }]));
  }
}
