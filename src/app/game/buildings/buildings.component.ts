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
      this.buildings = this.combinedLevel(town.buildings);
      this.resources = town.resources;
    })
  }

  combinedLevel(buildings) {
    return this.buildingList.map(i => {
      const building = buildings[i];
      building.name = i;
      building.combined = building.level + building.queued;
      return building;
    });
  }

  canUpgrade(building) {
    const target = this.buildingData[building.name].data[building.combined].costs;
    return (
      target.clay <= this.resources.clay &&
      target.wood <= this.resources.wood &&
      target.iron <= this.resources.iron
    )
  }

  upgrade(name, building) {
    this.townService.upgradeBuilding({ building: name, level: building.combined })
  }
}
