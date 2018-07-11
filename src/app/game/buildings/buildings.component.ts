import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { resourceTime, availableResources } from '../utils';
import { buildingData } from '../staticData';
import { Town } from '../town/town.model';

@Component({
  selector: 'buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss'],
})
export class BuildingsComponent implements OnChanges {
  @Input() public town: Town;
  @Input() public worldData;
  @Output() public build: EventEmitter<any> = new EventEmitter();

  public buildings = [];
  public buildingDetails = buildingData;
  public updateAvailability$: Subscription;

  constructor() {
    library.add(faChevronRight);
  }

  public ngOnChanges(changes?) {
    availableResources(this.town).pipe(
      take(1)
    ).subscribe((value) => {
      this.buildings = Object.entries(this.town.buildings).map(([name, building]) => {
          const next = building.queued || building.level;
          const targetBuilding = this.worldData.buildingMap[name];
          const requirements = targetBuilding.requirements;
          const nextLevel = targetBuilding.data[next];
          const availableIn = resourceTime(value, nextLevel.costs, this.town.production);
          let available = true;
          if (!next && requirements) {
            available = requirements.every((req) => req.level <= this.town.buildings[req.item].level);
          }
          return {
            ...building,
            ...nextLevel,
            name,
            next,
            requirements,
            available,
            availableIn,
          };
        });
        const soonestAvailable = this.buildings.reduce((availableNext, { available, availableIn, name }) =>
          available && availableIn > 0 ? Math.min(availableNext, availableIn) : availableNext, Infinity);
        if (soonestAvailable !== Infinity) {
          if (this.updateAvailability$) {
            this.updateAvailability$.unsubscribe();
          }
        this.updateAvailability$ = timer(soonestAvailable).subscribe(() => this.ngOnChanges());
        }
      });
  }

  public upgrade(building) {
    this.build.emit({ building: building.name, level: building.level });
  }
}
