import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../../services/game-data.service';
import { TownService, CommandService, MapService } from '../services/';

@Component({
  selector: 'command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {
  // TODO: convert this to a real form with validation
  private townUnits;
  private unitData;
  private unitDataMap;
  private target;
  private unitsToSend = {};

  constructor(private townService: TownService, private commandService: CommandService, private gameData: GameDataService, private mapService: MapService) {
    this.target = commandService.targeting || [];
    console.log(this.target);
  }

  ngOnInit() {
    this.gameData.data.activeWorld.subscribe(world => {
      this.unitData = world.units;
      this.unitDataMap = world.unitMap;
      console.log(world)
    });
    this.townService.currentTown.subscribe(town => {
      if (town) {
        this.townUnits = town.units;
      }
    });
  }

  sendCommand(isSupport) {
    const target = this.mapService.mapData[this.target.join(',')]
    const type = isSupport ? 'support' : 'attack';

    if (!target) {
      // TODO: error here
    }

    this.townService.sendUnits(target._id, this.unitsToSend, type);
  }

}
