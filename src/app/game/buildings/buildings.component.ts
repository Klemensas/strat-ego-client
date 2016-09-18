import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../../services/game-data.service'

@Component({
  selector: 'buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss'],
  inputs: ['buildings'],
})
export class BuildingsComponent implements OnInit {
  buildings;
  private worldData;
  private buildingList = [];

  constructor(private gameData: GameDataService) {
    this.gameData.data.activeWorld.subscribe(world => {
      this.worldData = world;
    });
  }

  ngOnInit() {
    this.buildingList = Object.keys(this.buildings);
    this.populateBuildingData()
  }

  populateBuildingData() {
    this.buildingList.forEach(b => {
      const level = this.buildings[b];
      this.buildings[b] = {
        data: this.worldData.buildingData[b].data,
        level
      };
    });
  }
}
