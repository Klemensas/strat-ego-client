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
  private town;
  private buildingData;
  private buildingDataMap = [];

  constructor(private townService: TownService, private gameData: GameDataService) {
  }

  ngOnInit() {
    this.gameData.data.activeWorld.subscribe(world => {
      this.buildingData = world.buildings;
      this.buildingDataMap = world.buildingMap;
    });
    this.townService.currentTown.subscribe(town => {
      this.town = town;
      this.buildings = this.modifyBuildings(town.buildings);
    });
  }

  modifyBuildings(buildings) {
    return this.buildingData.map(item => {
      const building = buildings[item.name];
      building.name = item.name;
      building.next = building.queued || building.level;
      building.available = true;
      if (building.next === 0 && item.requirements) {
        building.available = item.requirements.every(b => b.level <= buildings[b.item].level);
      }
      return building;
    });
  }

  canUpgrade(building) {
    const targetBuilding = this.buildingDataMap[building.name];
    const targetLevel = targetBuilding.data[building.next].costs;
    if (building.next === 0 && targetBuilding.requirements) {
    }

    return (
      targetLevel.clay <= this.town.resources.clay &&
      targetLevel.wood <= this.town.resources.wood &&
      targetLevel.iron <= this.town.resources.iron
    )
  }

  upgrade(building) {
    this.townService.upgradeBuilding({ building: building.name, level: building.next })
  }
}
