import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { Store, Action } from '@ngrx/store';

import { AllianceActions } from './alliance.actions';
import { TownActions } from '../town/town.actions';
import { StoreState } from '../';
import { SocketService } from '../../game/services/socket.service';
import { ActionWithPayload } from '../util';
import { PlayerActions } from '../player/player.actions';
import { getPlayerData } from '../player/player.selectors';
import { AllianceEvent } from './alliance.model';

@Injectable()
export class Allianceffects {
  @Effect()
  public setAllianceData$$: Observable<ActionWithPayload> = this.actions$
    .ofType(PlayerActions.UPDATE)
    .first()
    .map((action: ActionWithPayload) => action.payload)
    .map(({ AllianceId, Alliance, Invitations, AllianceRole }) => ({
      type: AllianceActions.SET_DATA,
      payload: {
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
    .map((name) => this.socketService.sendEvent('alliance:create', name));

  // @Effect()
  // public event$: Observable<Action> = this.actions$
  //   .ofType(AllianceActions.EVENT)
  //   .map((action: ActionWithPayload) => action.payload)
  //   .map((event) => {
  //     switch(event.type) {

  //     }
  //   })
  //   .map((name) => this.socketService.sendEvent('alliance:create', name));

  @Effect({ dispatch: false })
  public createInvite$: Observable<any> = this.actions$
    .ofType(AllianceActions.CREATE_INVITE)
    .map((action: ActionWithPayload) => action.payload)
    .map((name) => this.socketService.sendEvent('alliance:createInvite', name));

  @Effect({ dispatch: false })
  public cancelInvite$: Observable<any> = this.actions$
    .ofType(AllianceActions.CANCEL_INVITE)
    .map((action: ActionWithPayload) => action.payload)
    .map((playerId) => this.socketService.sendEvent('alliance:cancelInvite', playerId));

  @Effect({ dispatch: false })
  public acceptInvite$: Observable<any> = this.actions$
    .ofType(AllianceActions.ACCEPT_INVITE)
    .map((action: ActionWithPayload) => action.payload)
    .map((allianceId) => this.socketService.sendEvent('alliance:acceptInvite', allianceId));

  @Effect({ dispatch: false })
  public rejectInvite$: Observable<any> = this.actions$
    .ofType(AllianceActions.REJECT_INVITE)
    .map((action: ActionWithPayload) => action.payload)
    .map((allianceId) => this.socketService.sendEvent('alliance:rejectInvite', allianceId));

  @Effect({ dispatch: false })
  public updatePlayerRole$: Observable<any> = this.actions$
    .ofType(AllianceActions.UPDATE_MEMBER_ROLE)
    .map((action: ActionWithPayload) => action.payload)
    .map((payload) => this.socketService.sendEvent('alliance:updateMemberRole', payload));

  // TODO: consider changing this as it's an outlier in role event.
  // The event updates all roles/members accordinly but it can't update self role as it can't identify player
  @Effect()
  public updateSelfRole$: Observable<any> = this.actions$
    .ofType(AllianceActions.EVENT_ROLES)
    .map((action: ActionWithPayload) => action.payload)
    .withLatestFrom(this.store.select(getPlayerData))
    .filter(([payload, player]) => payload.data.updatedMember && payload.data.updatedMember.some(({ id }) => id === player.id))
    .map(([payload, player]) => ({
      type: AllianceActions.UPDATE_SELF_ROLE,
      payload: payload.data.updatedMember.find(({ id }) => id === player.id).role
    }));

  @Effect({ dispatch: false })
  public updateRolePermissions$: Observable<any> = this.actions$
    .ofType(AllianceActions.UPDATE_ROLE_PERMISSIONS)
    .map((action: ActionWithPayload) => action.payload)
    .map((payload) => this.socketService.sendEvent('alliance:updateRoles', payload));

  @Effect({ dispatch: false })
  public removeRole$: Observable<any> = this.actions$
    .ofType(AllianceActions.REMOVE_ROLE)
    .map((action: ActionWithPayload) => action.payload)
    .map((payload) => this.socketService.sendEvent('alliance:removeRole', payload));

  @Effect({ dispatch: false })
  public removeMember$: Observable<any> = this.actions$
    .ofType(AllianceActions.REMOVE_MEMBER)
    .map((action: ActionWithPayload) => action.payload)
    .map((payload) => this.socketService.sendEvent('alliance:removeMember', payload));

  @Effect({ dispatch: false })
  public leaveAlliance$: Observable<any> = this.actions$
    .ofType(AllianceActions.LEAVE_ALLIANCE)
    .map((payload) => this.socketService.sendEvent('alliance:leave'));

  @Effect({ dispatch: false })
  public attemptDestroying$: Observable<any> = this.actions$
    .ofType(AllianceActions.DESTROY)
    .map((payload) => this.socketService.sendEvent('alliance:destroy'));

  @Effect({ dispatch: false })
  public createForumCategory$: Observable<any> = this.actions$
    .ofType(AllianceActions.CREATE_FORUM_CATEGORY)
    .map((action: ActionWithPayload) => action.payload)
    .map((payload) => this.socketService.sendEvent('alliance:createForumCategory', payload));

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<StoreState>,
    private socketService: SocketService,
  ) {
    this.socketService.registerEvents([
      [
        'alliance:event',
        (payload: { event: AllianceEvent, data: any }) => this.store.dispatch({ type: `[Alliance] EVENT_${payload.event.type.toUpperCase()}`, payload })
      ],
      [
        'alliance',
        (payload) => this.store.dispatch({ type: AllianceActions.UPDATE, payload })
      ],
      [
        'alliance:createSuccess',
        (payload) => this.store.dispatch({ type: AllianceActions.CREATE_SUCCESS, payload })
      ],
      [
        'alliance:createInviteSuccess',
        (payload) => this.store.dispatch({ type: AllianceActions.CREATE_INVITE_SUCCESS, payload })
      ],
      [
        'alliance:cancelInviteSuccess',
        (payload) => this.store.dispatch({ type: AllianceActions.CANCEL_INVITE_SUCCESS, payload })
      ],
      [
        'alliance:removeMemberSuccess',
        (payload) => this.store.dispatch({ type: AllianceActions.REMOVE_MEMBER_SUCCESS, payload })
      ],
      [
        'alliance:updateRolePermissionsSuccess',
        (payload) => this.store.dispatch({ type: AllianceActions.UPDATE_ROLE_PERMISSIONS_SUCCESS, payload })
      ],
      [
        'alliance:removeRoleSuccess',
        (payload) => this.store.dispatch({ type: AllianceActions.REMOVE_ROLE_SUCCESS, payload })
      ],
      [
        'alliance:updateMemberRoleSuccess',
        (payload) => this.store.dispatch({ type: AllianceActions.UPDATE_MEMBER_ROLE_SUCCESS, payload })
      ],
      [
        'alliance:removed',
        () => this.store.dispatch({ type: AllianceActions.REMOVED })
      ],
      [
        'alliance:invited',
        (payload) => this.store.dispatch({ type: AllianceActions.INVITED, payload })
      ],
      [
        'alliance:inviteCanceled',
        (payload) => this.store.dispatch({ type: AllianceActions.INVITE_CANCELED, payload })
      ],
      [
        'alliance:inviteRejected',
        (payload) => this.store.dispatch({ type: AllianceActions.INVITE_REJECTED, payload })
      ],
      [
        'alliance:rejectInviteSuccess',
        (payload) => this.store.dispatch({ type: AllianceActions.REJECT_INVITE_SUCCESS, payload })
      ],
      [
        'alliance:leaveAllianceSuccess',
       () => this.store.dispatch({ type: AllianceActions.LEAVE_ALLIANCE_SUCCESS })
      ],
      [
        'alliance:destroyed',
       () => this.store.dispatch({ type: AllianceActions.DESTROY_SUCCESS })
      ],
      [
        'alliance:createForumCategory',
        (payload) => this.store.dispatch({ type: AllianceActions.CREATE_FORUM_CATEGORY_SUCCESS, payload })
      ],
      [
        'alliance:acceptInviteSuccess',
        (payload) => this.store.dispatch({ type: AllianceActions.ACCEPT_INVITE_SUCCESS, payload })
      ],

    ]);
  }
}
