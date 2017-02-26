import { Component, OnInit } from '@angular/core';
import { TownService } from '../services/';
import { GameDataService } from '../../services/game-data.service';


@Component({
  selector: 'movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {
  private outgoing = [];
  private incoming = [];
  private unitTypes = [];
  constructor(private townService: TownService, private gameData: GameDataService) { }

  ngOnInit() {
    this.gameData.data.activeWorld.subscribe(world => {
      // this.worldData = world;
      this.unitTypes  = world.units;
      console.log('woosh', world, this.unitTypes);
      // this.buildingData = world.buildingData;
      // this.buildingList = Object.keys(world.buildingData);
    });
  // }
    this.townService.currentTown.subscribe(town => {
      if (town) {
        this.outgoing = town.MovementOriginTown;
        this.incoming = town.MovementDestinationTown;
      }
    });
  }

}
