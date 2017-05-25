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
  public townUnits;
  public unitData;
  public unitDataMap;
  public target;
  public targetCoords;
  public unitsToSend = {};
  public sending = false;
  public sent;
  public townId;
  public unitDetails;

  constructor(private townService: TownService, private commandService: CommandService, private gameData: GameDataService, private mapService: MapService) {
    this.unitDetails = this.gameData.unitData;
    this.commandService.targeting.subscribe(target => {
      this.target = target;
      this.targetCoords = target
    });
    this.townService.townEvents.movement.subscribe(update => {
      this.sending = false;
      this.sent = true;
    });
  }

  ngOnInit() {
    this.gameData.data.activeWorld.subscribe(world => {
      this.unitData = world.units;
      this.unitDataMap = world.unitMap;
    });
    this.townService.currentTown.subscribe(town => {
      if (town) {
        this.townId = town._id;
        this.townUnits = town.units;
      }
    });
  }

  sendCommand(isSupport, form) {
    const target = this.mapService.mapData[this.target.join(',')]
    const type = isSupport ? 'support' : 'attack';

    if (target._id === this.townId) {
      form.form.setErrors({ errorMessage: 'A town can\'t attack itself.'})
      return;
    }

    const units = Object.entries(form.value).filter(([unit, amount]) => !!+amount);
    const validUnits = units.length ?
      units.every(([unit, amount]) => this.townUnits[unit].inside >= amount) :
      false;

    if (!validUnits) {
      form.form.setErrors({ errorMessage: 'Incorrectly entered units.'})
      return;
    }
    if (!target) {
      form.form.setErrors({ errorMessage: 'Invalid town coordinates.'})
      return;
    }

    this.sending = true;
    this.townService.sendUnits(target._id, this.unitsToSend, type);
  }

}
