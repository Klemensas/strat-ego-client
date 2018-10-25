import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, withLatestFrom, filter, concatMap } from 'rxjs/operators';
import { Store, Action } from '@ngrx/store';
import { AllianceEventSocketMessage } from 'strat-ego-common';

import * as allianceActions from './alliance.actions';
import { GameModuleState, getCurrentPlayer, getAllianceEntities, getAllianceState, getPlayerState } from '../reducers';
import { SocketService } from '../../game/services/socket.service';
import { PlayerActionTypes, LoadProfilesSuccess, LoadProfiles as LoadPlayerProfiles } from '../player/player.actions';
import { SetSidenav } from '../menu/menu.actions';

@Injectable()
export class Allianceffects {
  // @Effect()
  // public setAllianceData$$: Observable<Action> = this.actions$.pipe(
  //   ofType<UpdatePlayer>(PlayerActionTypes.Update),
  //   first(),
  //   map((action) => action.payload),
  //   map(({ allianceId, alliance, invitations, allianceRole }) => new allianceActions.SetData({
  //       allianceId,
  //       alliance,
  //       allianceRole,
  //       invitations,
  //     })
  //   )
  // );

  @Effect({ dispatch: false })
  public create$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.Create>(allianceActions.AllianceActionTypes.Create),
    map((action) => action.payload),
    map((name) => this.socketService.sendEvent('alliance:create', name))
  );

  @Effect({ dispatch: false })
  public createInvite$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.CreateInvite>(allianceActions.AllianceActionTypes.CreateInvite),
    map((action) => action.payload),
    map((name) => this.socketService.sendEvent('alliance:createInvite', name))
  );

  @Effect({ dispatch: false })
  public cancelInvite$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.CancelInvite>(allianceActions.AllianceActionTypes.CancelInvite),
    map((action) => action.payload),
    map((playerId) => this.socketService.sendEvent('alliance:cancelInvite', playerId))
  );

  @Effect({ dispatch: false })
  public acceptInvite$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.AcceptInvite>(allianceActions.AllianceActionTypes.AcceptInvite),
    map((action) => action.payload),
    map((allianceId) => this.socketService.sendEvent('alliance:acceptInvite', allianceId))
  );

  @Effect({ dispatch: false })
  public rejectInvite$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.RejectInvite>(allianceActions.AllianceActionTypes.RejectInvite),
    map((action) => action.payload),
    map((allianceId) => this.socketService.sendEvent('alliance:rejectInvite', allianceId))
  );

  @Effect({ dispatch: false })
  public updatePlayerRole$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.UpdateMemberRole>(allianceActions.AllianceActionTypes.UpdateMemberRole),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('alliance:updateMemberRole', payload))
  );

  // TODO: consider changing this as it's an outlier in role event.
  // The event updates all roles/members accordinly but it can't update self role as it can't identify player
  @Effect()
  public updateSelfRole$: Observable<Action> = this.actions$.pipe(
    ofType<allianceActions.EventRoles>(allianceActions.AllianceActionTypes.EventRoles),
    map((action) => action.payload),
    withLatestFrom(this.store.select(getCurrentPlayer)),
    filter(([payload, player]) => payload.data.updatedMember && payload.data.updatedMember.some(({ id }) => id === player.id)),
    map(([payload, player]) => new allianceActions.UpdateSelfRole(payload.data.updatedMember.find(({ id }) => id === player.id).role))
  );

  @Effect({ dispatch: false })
  public updateRolePermissions$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.UpdateRolePermissions>(allianceActions.AllianceActionTypes.UpdateRolePermissions),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('alliance:updateRoles', payload))
  );

  @Effect({ dispatch: false })
  public removeRole$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.RemoveRole>(allianceActions.AllianceActionTypes.RemoveRole),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('alliance:removeRole', payload))
  );

  @Effect({ dispatch: false })
  public removeMember$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.RemoveMember>(allianceActions.AllianceActionTypes.RemoveMember),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('alliance:removeMember', payload))
  );

  @Effect({ dispatch: false })
  public leaveAlliance$: Observable<any> = this.actions$.pipe(
    ofType(allianceActions.AllianceActionTypes.LeaveAlliance),
    map(() => this.socketService.sendEvent('alliance:leave'))
  );

  @Effect({ dispatch: false })
  public attemptDestroying$: Observable<any> = this.actions$.pipe(
    ofType(allianceActions.AllianceActionTypes.Destroy),
    map(() => this.socketService.sendEvent('alliance:destroy'))
  );

  @Effect({ dispatch: false })
  public proposeAlliance$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.ProposeAlliance>(allianceActions.AllianceActionTypes.ProposeAlliance),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('alliance:proposeAlliance', payload))
  );

  @Effect({ dispatch: false })
  public rejectAlliance$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.RejectAlliance>(allianceActions.AllianceActionTypes.RejectAlliance),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('alliance:rejectAlliance', payload))
  );

  @Effect({ dispatch: false })
  public cancelAlliance$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.CancelAlliance>(allianceActions.AllianceActionTypes.CancelAlliance),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('alliance:cancelAlliance', payload))
  );

  @Effect({ dispatch: false })
  public acceptAlliance$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.AcceptAlliance>(allianceActions.AllianceActionTypes.AcceptAlliance),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('alliance:acceptAlliance', payload))
  );

  @Effect({ dispatch: false })
  public endAlliance$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.EndAlliance>(allianceActions.AllianceActionTypes.EndAlliance),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('alliance:endAlliance', payload))
  );

  @Effect({ dispatch: false })
  public proposeNap$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.ProposeNap>(allianceActions.AllianceActionTypes.ProposeNap),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('alliance:proposeNap', payload))
  );

  @Effect({ dispatch: false })
  public rejectNap$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.RejectNap>(allianceActions.AllianceActionTypes.RejectNap),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('alliance:rejectNap', payload))
  );

  @Effect({ dispatch: false })
  public cancelNap$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.CancelNap>(allianceActions.AllianceActionTypes.CancelNap),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('alliance:cancelNap', payload))
  );

  @Effect({ dispatch: false })
  public acceptNap$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.AcceptNap>(allianceActions.AllianceActionTypes.AcceptNap),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('alliance:acceptNap', payload))
  );

  @Effect({ dispatch: false })
  public endNap$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.EndNap>(allianceActions.AllianceActionTypes.EndNap),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('alliance:endNap', payload))
  );

  @Effect({ dispatch: false })
  public declareWar$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.DeclareWar>(allianceActions.AllianceActionTypes.DeclareWar),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('alliance:declareWar', payload))
  );

  @Effect()
  public viewProfile$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.ViewProfile>(allianceActions.AllianceActionTypes.ViewProfile),
    map((action) => action.payload),
    withLatestFrom(this.store.select(getAllianceEntities)),
    map(([payload, allianceEntities]) => {
      const alliance = allianceEntities[payload];
      if (!alliance) { this.socketService.sendEvent('profile:loadAlliances', [payload]); }
      return new SetSidenav([{ side: 'right', name: 'allianceProfile' }]);
    })
  );

  @Effect({ dispatch: false })
  public updateProfile$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.UpdateProfile>(allianceActions.AllianceActionTypes.UpdateProfile),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('alliance:updateProfile', payload))
  );

  @Effect({ dispatch: false })
  public removeAvatar$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.RemoveAvatar>(allianceActions.AllianceActionTypes.RemoveAvatar),
    map(() => this.socketService.sendEvent('alliance:removeAvatar'))
  );

  @Effect({ dispatch: false })
  public loadPlayerProfiles$: Observable<any> = this.actions$.pipe(
    ofType<LoadProfilesSuccess>(PlayerActionTypes.LoadProfilesSuccess),
    withLatestFrom(this.store.select(getAllianceEntities)),
    map(([action, entities]) => Object.values(action.payload).reduce((result, { allianceId }) => {
      if (allianceId !== null && !entities[allianceId]) {
        result.push(allianceId);
      }
      return result;
    }, [])),
    filter((missingProfiles) => !!missingProfiles.length),
    map((payload) => this.socketService.sendEvent('profile:loadAlliances', payload))
  );

  @Effect()
  public loadAllianceProfiles$: Observable<any> = this.actions$.pipe(
    ofType<allianceActions.Initialize>(allianceActions.AllianceActionTypes.Initialize),
    withLatestFrom(this.store.select(getAllianceState), this.store.select(getPlayerState)),
    map(([action, allianceState, playerState]) => {
      const missingAllianceIds = new Set<number>();
      const missingPlayerIds = new Set<number>();
      const alliance = action.payload.alliance;

      if (!alliance) {
        return { missingAllianceIds, missingPlayerIds };
      }

      alliance.invitations.forEach(({ id }) => !playerState[id] && !playerState[id] ? missingPlayerIds.add(id) : null);
      alliance.events.forEach(missingLoop);
      alliance.diplomacyOrigin.forEach(missingLoop);
      alliance.diplomacyTarget.forEach(missingLoop);

      return { missingAllianceIds, missingPlayerIds };

      function missingLoop({ originAllianceId, targetAllianceId, originPlayerId, targetPlayerId }) {
        if (originAllianceId && !allianceState.entities[originAllianceId] && !allianceState.loadingIds[originAllianceId]) {
          missingAllianceIds.add(originAllianceId);
        }
        if (targetAllianceId && !allianceState.entities[targetAllianceId] && !allianceState.loadingIds[targetAllianceId]) {
          missingAllianceIds.add(targetAllianceId);
        }
        if (originPlayerId && !playerState.entities[originPlayerId] && !playerState.loadingIds[originPlayerId]) {
          missingPlayerIds.add(originPlayerId);
        }
        if (targetPlayerId && !playerState.entities[targetPlayerId] && !playerState.loadingIds[targetPlayerId]) {
          missingPlayerIds.add(targetPlayerId);
        }
      }
    }),
    filter((payload) => !!payload.missingAllianceIds.size || !!payload.missingPlayerIds.size),
    concatMap((payload) => {
      const actions = [];
      if (payload.missingPlayerIds.size) { actions.push(new LoadPlayerProfiles([...payload.missingPlayerIds])); }
      if (payload.missingAllianceIds.size) { actions.push(new allianceActions.LoadProfiles([...payload.missingAllianceIds])); }

      return actions;
    })
  );

  // @Effect({ dispatch: false })
  // public createForumCategory$: Observable<any> = this.actions$
  //   .ofType(allianceActions.AllianceActionTypes.CreateForumCategory)
  //   .map((action) => action.payload)
  //   .map((payload) => this.socketService.sendEvent('alliance:createForumCategory', payload));

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<GameModuleState>,
    private socketService: SocketService,
  ) {
    this.socketService.registerEvents([
      ['initialize', (payload) => this.store.dispatch(new allianceActions.Initialize({
        player: payload.player,
        alliance: payload.alliance
      }))],
      [
        'alliance:event',
        (payload: AllianceEventSocketMessage<any>) => {
          const eventAction = new allianceActions[allianceActions.AllianceEventActions[payload.event.type]](payload);
          this.store.dispatch(eventAction);
        }
      ],
      ['alliance:createSuccess', (payload) => this.store.dispatch(new allianceActions.CreateSuccess(payload))],
      ['alliance:createInviteSuccess', (payload) => this.store.dispatch(new allianceActions.CreateInviteSuccess(payload))],
      ['alliance:cancelInviteSuccess', (payload) => this.store.dispatch(new allianceActions.CancelInviteSuccess(payload))],
      ['alliance:removeMemberSuccess', (payload) => this.store.dispatch(new allianceActions.RemoveMemberSuccess(payload))],
      ['alliance:updateRolePermissionsSuccess', (payload) => this.store.dispatch(new allianceActions.UpdateRolePermissionsSuccess(payload))],
      ['alliance:removeRoleSuccess', (payload) => this.store.dispatch(new allianceActions.RemoveRoleSuccess(payload))],
      ['alliance:updateMemberRoleSuccess', (payload) => this.store.dispatch(new allianceActions.UpdateMemberRoleSuccess(payload))],
      ['alliance:removed', () => this.store.dispatch(new allianceActions.Removed())],
      ['alliance:invited', (payload) => this.store.dispatch(new allianceActions.Invited(payload))],
      ['alliance:inviteCanceled', (payload) => this.store.dispatch(new allianceActions.InviteCanceled(payload))],
      ['alliance:rejectInviteSuccess', (payload) => this.store.dispatch(new allianceActions.RejectInviteSuccess(payload))],
      ['alliance:leaveAllianceSuccess', () => this.store.dispatch(new allianceActions.LeaveAllianceSuccess())],
      ['alliance:destroySuccess', () => this.store.dispatch(new allianceActions.DestroySuccess())],
      ['alliance:proposeAllianceSuccess', (payload) => this.store.dispatch(new allianceActions.ProposeAllianceSuccess(payload))],
      ['alliance:proposeNapSuccess', (payload) => this.store.dispatch(new allianceActions.ProposeNapSuccess(payload))],
      ['alliance:cancelAllianceSuccess', (payload) => this.store.dispatch(new allianceActions.CancelAllianceSuccess(payload))],
      ['alliance:cancelNapSuccess', (payload) => this.store.dispatch(new allianceActions.CancelNapSuccess(payload))],
      ['alliance:rejectAllianceSuccess', (payload) => this.store.dispatch(new allianceActions.RejectAllianceSuccess(payload))],
      ['alliance:rejectNapSuccess', (payload) => this.store.dispatch(new allianceActions.RejectNapSuccess(payload))],
      ['alliance:acceptAllianceSuccess', (payload) => this.store.dispatch(new allianceActions.AcceptAllianceSuccess(payload))],
      ['alliance:acceptNapSuccess', (payload) => this.store.dispatch(new allianceActions.AcceptNapSuccess(payload))],
      ['alliance:endAllianceSuccess', (payload) => this.store.dispatch(new allianceActions.EndAllianceSuccess(payload))],
      ['alliance:endNapSuccess', (payload) => this.store.dispatch(new allianceActions.EndNapSuccess(payload))],
      ['alliance:declareWarSuccess', (payload) => this.store.dispatch(new allianceActions.DeclareWarSuccess(payload))],
      ['alliance:acceptInviteSuccess', (payload) => this.store.dispatch(new allianceActions.AcceptInviteSuccess(payload))],
      ['alliance:updateProfileSuccess', (payload) => this.store.dispatch(new allianceActions.UpdateProfileSuccess(payload))],
      ['alliance:removeAvatarSuccess', (payload) => this.store.dispatch(new allianceActions.RemoveAvatarSuccess(payload))],

      ['alliance:createFail', (payload) => this.store.dispatch(new allianceActions.CreateFail(payload))],
      ['alliance:createInviteFail', (payload) => this.store.dispatch(new allianceActions.CreateInviteFail(payload))],
      ['alliance:cancelInviteFail', (payload) => this.store.dispatch(new allianceActions.CancelInviteFail(payload))],
      ['alliance:removeMemberFail', (payload) => this.store.dispatch(new allianceActions.RemoveMemberFail(payload))],
      ['alliance:updateRolePermissionsFail', (payload) => this.store.dispatch(new allianceActions.UpdateRolePermissionsFail(payload))],
      ['alliance:removeRoleFail', (payload) => this.store.dispatch(new allianceActions.RemoveRoleFail(payload))],
      ['alliance:updateMemberRoleFail', (payload) => this.store.dispatch(new allianceActions.UpdateMemberRoleFail(payload))],
      ['alliance:rejectInviteFail', (payload) => this.store.dispatch(new allianceActions.RejectInviteFail(payload))],
      ['alliance:leaveAllianceFail', (payload) => this.store.dispatch(new allianceActions.LeaveAllianceFail(payload))],
      ['alliance:destroyFail', (payload) => this.store.dispatch(new allianceActions.DestroyFail(payload))],
      ['alliance:proposeAllianceFail', (payload) => this.store.dispatch(new allianceActions.ProposeAllianceFail(payload))],
      ['alliance:proposeNapFail', (payload) => this.store.dispatch(new allianceActions.ProposeNapFail(payload))],
      ['alliance:cancelAllianceFail', (payload) => this.store.dispatch(new allianceActions.CancelAllianceFail(payload))],
      ['alliance:cancelNapFail', (payload) => this.store.dispatch(new allianceActions.CancelNapFail(payload))],
      ['alliance:rejectAllianceFail', (payload) => this.store.dispatch(new allianceActions.RejectAllianceFail(payload))],
      ['alliance:rejectNapFail', (payload) => this.store.dispatch(new allianceActions.RejectNapFail(payload))],
      ['alliance:acceptAllianceFail', (payload) => this.store.dispatch(new allianceActions.AcceptAllianceFail(payload))],
      ['alliance:acceptNapFail', (payload) => this.store.dispatch(new allianceActions.AcceptNapFail(payload))],
      ['alliance:endAllianceFail', (payload) => this.store.dispatch(new allianceActions.EndAllianceFail(payload))],
      ['alliance:endNapFail', (payload) => this.store.dispatch(new allianceActions.EndNapFail(payload))],
      ['alliance:declareWarFail', (payload) => this.store.dispatch(new allianceActions.DeclareWarFail(payload))],
      ['alliance:acceptInviteFail', (payload) => this.store.dispatch(new allianceActions.AcceptInviteFail(payload))],
      ['alliance:updateProfileFail', (payload) => this.store.dispatch(new allianceActions.UpdateProfileFail(payload))],
      ['alliance:removeAvatarFail', (payload) => this.store.dispatch(new allianceActions.RemoveAvatarFail(payload))],

      ['profile:loadAllianceSuccess', (payload) => this.store.dispatch(new allianceActions.LoadProfilesSuccess(payload))],
      ['profile:loadAllianceFail', (payload) => this.store.dispatch(new allianceActions.LoadProfilesFail(payload))],
      // ['alliance', (payload) => this.store.dispatch({ type: allianceActions.AllianceActionTypes.UPDATE, payload))],
      // ['alliance:createForumCategory', (payload) => this.store.dispatch({ type: allianceActions.AllianceActionTypes.CREATE_FORUM_CATEGORY_SUCCESS, payload))],
    ]);
  }
}
