import { Component, OnChanges, Input  } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { WorldData, Resources, Unit } from 'strat-ego-common';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { unitData } from '../staticData';
import { GameModuleState } from '../reducers';
import { Town } from '../town/town.model';
import { TownActions, Recruit } from '../town/town.actions';
import { availableResources } from '../utils';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'recruit',
  templateUrl: './recruit.component.html',
  styleUrls: ['./recruit.component.scss'],
})
export class RecruitComponent implements OnChanges {
  @Input() public town: Town;
  @Input() public worldData: WorldData;
  // TODO: handle town actions, either by one simple inProgress/error or by town specific aciton state
  @Input() public actionInProgress = false;
  public unitDetails = unitData;
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
  recruiting = false;
  availableResources$: Observable<Resources>;
  resourceSubscription: Subscription;

  constructor(private store: Store<GameModuleState>) {
    library.add(faChevronRight);
  }

  // TODO: update resources, either listen to resource events in an interval or
  // find the time when the next unit is available and update then
  ngOnChanges() {
    this.availableResources$ = availableResources(this.town);
    if (this.resourceSubscription) {
      this.resourceSubscription.unsubscribe();
    }
    this.resourceSubscription = this.availableResources$.subscribe((resources) => this.updateResources(resources, this.recruiting && !this.actionInProgress));
  }

  updateResources(resources: Resources, shouldReset = false) {
    // If recruiting flag is set and action finished
    if (shouldReset) {
      this.recruitment.units = {};
      this.recruitment.population = 0;
      this.recruitment.resourcesAvailable = this.recruitment.resources;
      this.recruiting = false;
    }
    if (
      this.recruitment.resources.wood === this.recruitment.resourcesAvailable.wood &&
      this.recruitment.resources.clay === this.recruitment.resourcesAvailable.clay &&
      this.recruitment.resources.iron === this.recruitment.resourcesAvailable.iron
    ) {
      this.recruitment.resources = resources;
      this.recruitment.resourcesAvailable = { ...resources };
      return;
    }
    const diff = {
      wood: resources.wood - this.recruitment.resources.wood,
      clay: resources.clay - this.recruitment.resources.clay,
      iron: resources.iron - this.recruitment.resources.iron,
    };
    this.recruitment.resources = resources;
    this.recruitment.resourcesAvailable.wood += diff.wood;
    this.recruitment.resourcesAvailable.clay += diff.clay;
    this.recruitment.resourcesAvailable.iron += diff.iron;
  }

  unitAmountUpdate($event, type) {
    $event = Math.max($event, 0) || 0;
    const change = $event - (this.recruitment.units[type] || 0);
    if (typeof $event === 'number') {
      const unitCosts = this.worldData.unitMap[type].costs;
      const population = this.worldData.unitMap[type].farmSpace * change;
      this.recruitment.resourcesAvailable.wood -= unitCosts.wood * change;
      this.recruitment.resourcesAvailable.clay -= unitCosts.clay * change;
      this.recruitment.resourcesAvailable.iron -= unitCosts.iron * change;
      this.recruitment.population = Math.max(this.recruitment.population + population, 0);
    }
    this.recruitment.units[type] = $event;
  }

  calculateMax(unit: Unit) {
    return Math.max(
      Math.min.apply(null, [
        Math.floor(this.recruitment.resourcesAvailable.wood / unit.costs.wood),
        Math.floor(this.recruitment.resourcesAvailable.clay / unit.costs.clay),
        Math.floor(this.recruitment.resourcesAvailable.iron / unit.costs.iron),
        Math.floor((this.town.population.available - this.recruitment.population) / unit.farmSpace),
      ]),
      0
    );
    }

  canRecruit(unit) {
    if (this.actionInProgress || this.town.population.available <= 0) {
      return false;
    }
    if (!unit.requirements) {
      return true;
    }
    return unit.requirements.every(req => req.level <= this.town.buildings[req.item].level);
  }

  recruit(amount, type) {
    this.store.dispatch(new Recruit([{ type, amount }]));
    this.recruiting = true;
  }
}
