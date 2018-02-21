import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { GameDataService } from '../../services/game-data.service';
import { CommandService, MapService } from '../services/';
import { unitData } from '../staticData';
import { GameModuleState } from '../../store';
import { Town } from '../../store/town/town.model';
import { SendTroops } from '../../store/town/town.actions';

@Component({
  selector: 'command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {
  @Input() public town: Town;
  @Input() public worldData;
  // TODO: convert this to a real form with validation
  // public townUnits;
  public unitDetails = unitData;
  public target: [number, number] = [null, null];
  public targetCoords;
  public unitsToSend = {};
  public sending = false;
  public sent;
  public townId;
  // public unitDetails;

  constructor(
    private commandService: CommandService,
    private gameData: GameDataService,
    private mapService: MapService,
    private store: Store<GameModuleState>,
  ) {
    this.commandService.targeting.subscribe(target => {
      this.target = target;
      this.targetCoords = target;
    });
  }

  ngOnInit() {}

  sendCommand(isSupport, form) {
    // TODO: fill actual town data
    // const target = this.mapService.mapData[this.target.join(',')]

    // if (!target) {
      //   form.form.setErrors({ errorMessage: 'Invalid town coordinates.'})
      //   return;
      // }
    if (this.target === this.town.location) {
      form.form.setErrors({ errorMessage: 'A town can\'t attack itself.'});
      return;
    }

    const type = isSupport ? 'support' : 'attack';
    const units = (Object.entries(form.value) as [string, number][]).filter(([unit, amount]) => !!+amount);
    const validUnits = units.length ?
      units.every(([unit, amount]) => this.town.units[unit].inside >= amount) :
      false;

    if (!validUnits) {
      form.form.setErrors({ errorMessage: 'Incorrectly entered units.'});
      return;
    }

    this.store.dispatch(new SendTroops({ units, type, target: this.target }));
  }

}
