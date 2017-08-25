import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { resourceTime } from '../utils';
import { buildingData } from '../staticData';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss'],
})
export class BuildingsComponent implements OnChanges {
  @Input() public town;
  @Input() public worldData;
  @Output() public upgradeBuilding: EventEmitter<any> = new EventEmitter();

  public buildings = [];
  public buildingDetails = buildingData;

  public ngOnChanges(changes) {
    this.buildings = Object.entries(this.town.buildings).map(([name, building]) => {
      const next = building.queued || building.level;
      const targetBuilding = this.worldData.buildingMap[name];
      const requirements = targetBuilding.requirements;
      const nextLevel = targetBuilding.data[next];
      const availableIn = resourceTime(this.town.resources, nextLevel.costs, this.town.production);
      let available = true;
      if (!next && requirements) {
        available = requirements.every((req) => req.level <= this.town.buildings[req.item].level)
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
  }

  // canUpgrade(building) {
  //   const targetBuilding = this.buildingDataMap[building.name];
  //   const targetLevel = targetBuilding.data[building.next].costs;
  //   if (building.next === 0 && targetBuilding.requirements) {
  //     const meetsReqs = targetBuilding.requirements.every(({ item, level }) => this.town.buildings[item].level >= level)
  //     if (!meetsReqs) {
  //       return false;
  //     }
  //   }

  //   return (
  //     targetLevel.clay <= this.town.resources.clay &&
  //     targetLevel.wood <= this.town.resources.wood &&
  //     targetLevel.iron <= this.town.resources.iron
  //   )
  // }

  public upgrade(building) {
    this.upgradeBuilding.emit({ building: building.name, level: building.level });
  }
}
