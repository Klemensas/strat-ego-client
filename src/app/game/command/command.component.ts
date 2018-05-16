import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { GameDataService } from '../../services/game-data.service';
import { CommandService, MapService } from '../services/';
import { unitData } from '../staticData';
import { GameModuleState } from '../reducers';
import { Town } from '../town/town.model';
import { MoveTroops } from '../town/town.actions';
import { MovementType } from 'strat-ego-common';

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

    const type = isSupport ? MovementType.support : MovementType.attack;
    const { units, isValid, isEmpty } = Object.entries(form.value).reduce((result, [key, value]) => {
      if (!!+value) {
        if (this.town.units[key].inside >= value) {
          result.units[key] = value;
          result.isEmpty = false;
        } else {
          result.isValid = false;
        }
      }
      return result;
    }, { isValid: true, isEmpty: true, units: {} });

    if (!isValid || isEmpty) {
      form.form.setErrors({ errorMessage: 'Incorrectly entered units.'});
      return;
    }

    this.store.dispatch(new MoveTroops({ units, type, target: this.target }));
  }

}
