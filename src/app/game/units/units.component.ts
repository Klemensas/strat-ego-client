import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../../services/game-data.service'
import { TownService } from '../services/town.service'

@Component({
  selector: 'units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  units;
  constructor(private townService: TownService, private gameData: GameDataService) { }

  ngOnInit() {
    // this.gameData.data.activeWorld.subscribe(world => {
    //   this.buildingData = world.buildingData;
    //   this.buildingDataMap = world.buildingDataMap;
    // });
    this.townService.currentTown.subscribe(town => {
      this.units = this.unitArray(town.units);
    });
  }

  unitArray(units) {
    const list = Object.keys(units);
    return list.reduce((array, item) => {
      const unit = units[item];
      if (unit.inside || unit.outside || unit.queued) {
        array.push({
          name: item,
          outside: unit.outside,
          inside: unit.inside,
          amount: unit.outside + unit.inside,
          queued: unit.queued
        });
      }
      return array;
    }, [])
  }

}
