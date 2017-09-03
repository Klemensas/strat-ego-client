import { Component, OnChanges, OnDestroy, Input  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { GameDataService } from '../../services/game-data.service';
import { TownService } from '../services/town.service';
import { unitData } from '../staticData';
import { StoreState } from '../../store';
import { TownActions, Town } from '../../store/town';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'recruit',
  templateUrl: './recruit.component.html',
  styleUrls: ['./recruit.component.scss'],
})
export class RecruitComponent implements OnChanges, OnDestroy {
  @Input() public town: Town;
  @Input() public worldData;
  public unitDetails = unitData;
  public units;
  public unitData;
  public unitDataMap;
  public recruitment = {
    resources: {},
    units: {},
    population: 0,
  };
  public hasRecruitmentQueue = false;
  public subscriptions = {
    gameData: null,
    currentTown: null,
    recruitEvents: null
  }
  public queue$: Observable<any>;

  constructor(
    private gameData: GameDataService,
    private townService: TownService,
    private store: Store<StoreState>,
  ) {}

  ngOnChanges() {
    this.unitData = this.worldData.units;
    // this.subscriptions.currentTown = this.townService.currentTown.subscribe(town => {
    if (this.town) {
      this.recruitment.resources = this.town.resources;
      // this.units = this.modifyUnits(town.units);
      this.hasRecruitmentQueue = !!this.town.UnitQueues.length;
    }
    // });
    // this.subscriptions.recruitEvents = this.townService.townEvents.recruit.subscribe(event => {
    //   this.recruiting = false;
    // });
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
      this.recruitment.resources['wood'] -= unitCosts.wood * change;
      this.recruitment.resources['clay'] -= unitCosts.clay * change;
      this.recruitment.resources['iron'] -= unitCosts.iron * change;
      this.recruitment.population = Math.max(this.recruitment.population + change, 0);
    }
    this.recruitment.units[type] = $event;
  }

  calculateMax(costs) {
    return Math.min.apply(null, [
      Math.floor(this.recruitment.resources['wood'] / costs.wood),
      Math.floor(this.recruitment.resources['clay'] / costs.clay),
      Math.floor(this.recruitment.resources['iron'] / costs.iron),
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
    return unit.requirements.every(req => req.level <= this.town.buildings[req.item].level)
  }

  recruit(amount, type) {
    this.store.dispatch({ type: TownActions.RECRUIT, payload: [{ type, amount }] })
    // this.townService.recruit([{ type, amount}]);
  }
}
