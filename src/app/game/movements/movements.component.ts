import { Component, OnInit } from '@angular/core';
import { TownService } from '../services/';
import { GameDataService } from '../../services/game-data.service';
import { MapService } from '../services';

@Component({
  selector: 'movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {
  private outgoing = [];
  private incoming = [];
  private returning = [];
  private unitTypes = [];
  constructor(private townService: TownService, private gameData: GameDataService, private mapService: MapService) {
    console.log(mapService);
  }

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
        console.log('update', town)
        this.outgoing = town.MovementOriginTown;
        // TODO: separate incoming into attacks and returning
        this.incoming = town.MovementDestinationTown;
      }
    });
  }

}
