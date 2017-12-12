import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';

import { AllianceActions } from './alliance.actions';
import { TownActions } from '../town/town.actions';
import { StoreState } from '../';
import { SocketService } from '../../game/services/socket.service';
import { ActionWithPayload } from 'app/store/util';
import { PlayerActions } from 'app/store/player/player.actions';

@Injectable()
export class Allianceffects {
  @Effect()
  public setAllianceData$$: Observable<ActionWithPayload> = this.actions$
    .ofType(PlayerActions.UPDATE)
    .map((action: ActionWithPayload) => action.payload)
    .map((t) => { console.log('www', t); return t })
    .map(({ AllianceId, Alliance, Invitations }) => ({
      type: AllianceActions.SET_DATA,
      payload: {
        AllianceId,
        Alliance,
        Invitations
      }
    }));

  @Effect({ dispatch: false })
  public create$: Observable<any> = this.actions$
    .ofType(AllianceActions.CREATE)
    .map((action: ActionWithPayload) => action.payload)
    .map((data) => this.socketService.sendEvent('alliance:create', data));

    // playerAlliance
    // permissions
    // invitations
    // .withL
    // .withLatestFrom(this.store.select(getActiveWorld))
    // .map(([towns, world]: [Town[], WorldData]) => this.updateAction(world, towns, TownActions.SET_PLAYER_TOWNS))


  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<StoreState>,
    private socketService: SocketService,
  ) {}
}
