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
  private worldData;
  private town;
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
      this.town = town;
      this.buildings = this.combineLevel(town.buildings);
    });
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
      target.clay <= this.town.resources.clay &&
      target.wood <= this.town.resources.wood &&
      target.iron <= this.town.resources.iron
    )
  }

  upgrade(building) {
    this.townService.upgradeBuilding({ building: building.name, level: building.next })
  }
}
