import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../../services/game-data.service'
import { TownService, CommandService } from '../services/'

@Component({
  selector: 'command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {
  private townUnits;
  private unitData;
  private unitDataMap;
  private target;
  private unitsToSend;

  constructor(private townService: TownService, private commandService: CommandService, private gameData: GameDataService) {
    this.target = commandService.targeting || [];
    console.log(this.target);
  }

  ngOnInit() {
    this.gameData.data.activeWorld.subscribe(world => {
      this.unitData = world.unitData;
      this.unitDataMap = world.unitDataMap;
      console.log(world)
    });
    this.townService.currentTown.subscribe(town => {
      if (town) {
        this.townUnits = town.units;
      }
    });
  }

  sendComand(isSupport) {
    console.log(isSupport);
  }

}
