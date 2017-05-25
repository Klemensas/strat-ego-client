import { Component, OnInit } from '@angular/core';

import { GameDataService } from '../../services/game-data.service';
import { TownService } from '../services/town.service';

import { Town } from '../models/Town';

@Component({
  selector: 'building-queue',
  templateUrl: './building-queue.component.html',
  styleUrls: ['./building-queue.component.scss']
})
export class BuildingQueueComponent implements OnInit {
  private worldData;
  private queue;
  private buildingDetails;

  constructor(private townService: TownService, private gameData: GameDataService) {
    this.buildingDetails = this.gameData.buildingData;
    this.gameData.data.activeWorld.subscribe(world => {
      this.worldData = world;
      // this.buildingData = world.buildingData;
      // this.buildingList = Object.keys(world.buildingData);
    });
  }

  ngOnInit() {
    this.townService.currentTown.subscribe((town: Town) => {
      this.queue = town.BuildingQueues;
    });
  }
}
