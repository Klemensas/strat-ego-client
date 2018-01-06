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
import { ActionWithPayload } from '../util';
import { PlayerActions } from '../player/player.actions';

@Injectable()
export class Allianceffects {
  @Effect()
  public setAllianceData$$: Observable<ActionWithPayload> = this.actions$
    .ofType(PlayerActions.UPDATE)
    .map((action: ActionWithPayload) => action.payload)
    .map(({ allianceName, AllianceId, Alliance, Invitations, AllianceRole }) => ({
      type: AllianceActions.SET_DATA,
      payload: {
        allianceName,
        AllianceId,
        Alliance,
        AllianceRole,
        Invitations,
      }
    }));

  @Effect({ dispatch: false })
  public create$: Observable<any> = this.actions$
    .ofType(AllianceActions.CREATE)
    .map((action: ActionWithPayload) => action.payload)
    .map((name) => this.socketService.sendEvent('alliance:create', { name }));

  @Effect({ dispatch: false })
  public invite$: Observable<any> = this.actions$
    .ofType(AllianceActions.SEND_INVITE)
    .map((action: ActionWithPayload) => action.payload)
    .map((name) => this.socketService.sendEvent('alliance:invite', { name }));

  @Effect({ dispatch: false })
  public cancelInvite$: Observable<any> = this.actions$
    .ofType(AllianceActions.CANCEL_INVITE)
    .map((action: ActionWithPayload) => action.payload)
    .map((playerId) => this.socketService.sendEvent('alliance:cancelInvite', { playerId }));

  @Effect({ dispatch: false })
  public accceptInvite$: Observable<any> = this.actions$
    .ofType(AllianceActions.ACCEPT_INVITE)
    .map((action: ActionWithPayload) => action.payload)
    .map((allianceId) => this.socketService.sendEvent('alliance:acceptInvite', { allianceId }));

  @Effect({ dispatch: false })
  public rejectInvite$: Observable<any> = this.actions$
    .ofType(AllianceActions.REJECT_INVITE)
    .map((action: ActionWithPayload) => action.payload)
    .map((allianceId) => this.socketService.sendEvent('alliance:rejectInvite', { allianceId }));

    @Effect({ dispatch: false })
    public updateRolePermissions$: Observable<any> = this.actions$
      .ofType(AllianceActions.UPDATE_ROLE_PERMISSIONS)
      .map((action: ActionWithPayload) => action.payload)
      .map((payload) => this.socketService.sendEvent('alliance:updateRoles', payload));


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
