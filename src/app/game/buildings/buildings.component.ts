import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../../services/game-data.service'
import { TownService } from '../services/town.service'

@Component({
  selector: 'buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss'],
})
export class BuildingsComponent implements OnInit {
  buildings;
  resources;
  private worldData;
  private buildingData;
  private buildingList = [];

  constructor(private townService: TownService, private gameData: GameDataService) {
  }

  ngOnInit() {
    this.gameData.data.activeWorld.subscribe(world => {
      this.worldData = world;
      this.buildingData = world.buildingData;
      this.buildingList = Object.keys(world.buildingData);
    });
    this.townService.currentTown.subscribe(town => {
      this.buildings = this.combineLevel(town.buildings);
      this.resources = town.resources;
    })
  }

  combineLevel(buildings) {
    return this.buildingList.map(i => {
      const building = buildings[i];
      building.name = i;
      building.next = building.queued || building.level;
      return building;
    });
  }

  canUpgrade(building) {
    const target = this.buildingData[building.name].data[building.next].costs;
    return (
      target.clay <= this.resources.clay &&
      target.wood <= this.resources.wood &&
      target.iron <= this.resources.iron
    )
  }

  upgrade(building) {
    this.townService.upgradeBuilding({ building: building.name, level: building.next })
  }
}
