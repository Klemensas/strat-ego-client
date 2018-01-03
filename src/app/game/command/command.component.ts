import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { GameDataService } from '../../services/game-data.service';
import { CommandService, MapService } from '../services/';
import { unitData } from '../staticData';
import { StoreState } from '../../store';
import { Town } from 'app/store/town/town.model';
import { TownActions } from 'app/store/town/town.actions';

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
  public target = [];
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
    private store: Store<StoreState>,
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
    const units = Object.entries(form.value).filter(([unit, amount]) => !!+amount);
    const validUnits = units.length ?
      units.every(([unit, amount]) => this.town.units[unit].inside >= amount) :
      false;

    if (!validUnits) {
      form.form.setErrors({ errorMessage: 'Incorrectly entered units.'});
      return;
    }

    this.store.dispatch({ type: TownActions.SEND_TROOPS, payload: { units, type, target: this.target } });
  }

}
