import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';

import { ChatActions } from './chat.actions';
import { StoreState } from '../';
import { SocketService } from '../../game/services/socket.service';
import { ActionWithPayload } from '../util';
import { PlayerActions } from '../player/player.actions';
import { Action } from '@ngrx/store/src/models';
import { Player } from '../player/player.model';
import { getChatMessages } from './chat.selectors';
import { AllianceMessage } from '../alliance/alliance.model';

@Injectable()
export class ChatEffects {
  @Effect({ dispatch: false })
  public postMessage$: Observable<any> = this.actions$
    .ofType(ChatActions.POST_MESSAGE)
    .map((action: ActionWithPayload) => action.payload)
    .map((payload) => this.socketService.sendEvent('chat:postMessage', payload));

  @Effect()
  public update$: Observable<any> = this.actions$
  .ofType(PlayerActions.UPDATE)
  .map((action: ActionWithPayload) => action.payload)
  .withLatestFrom(this.store.select(getChatMessages))
  .filter(([player, messages]: [Player, AllianceMessage[]]) => !messages.length && player.Alliance && !!player.Alliance.Messages.length)
  .map(([player]: [Player]) => ({
    type: ChatActions.UPDATE,
    payload: player.Alliance.Messages
  }));
  //   .map((name) => this.socketService.sendEvent('alliance:create', name));

  // @Effect({ dispatch: false })
  // public invite$: Observable<any> = this.actions$
  //   .ofType(AllianceActions.SEND_INVITE)
  //   .map((action: ActionWithPayload) => action.payload)
  //   .map((name) => this.socketService.sendEvent('alliance:invite', name));

  // @Effect({ dispatch: false })
  // public cancelInvite$: Observable<any> = this.actions$
  //   .ofType(AllianceActions.CANCEL_INVITE)
  //   .map((action: ActionWithPayload) => action.payload)
  //   .map((playerId) => this.socketService.sendEvent('alliance:cancelInvite', playerId));

  // @Effect({ dispatch: false })
  // public accceptInvite$: Observable<any> = this.actions$
  //   .ofType(AllianceActions.ACCEPT_INVITE)
  //   .map((action: ActionWithPayload) => action.payload)
  //   .map((allianceId) => this.socketService.sendEvent('alliance:acceptInvite', allianceId));

  // @Effect({ dispatch: false })
  // public rejectInvite$: Observable<any> = this.actions$
  //   .ofType(AllianceActions.REJECT_INVITE)
  //   .map((action: ActionWithPayload) => action.payload)
  //   .map((allianceId) => this.socketService.sendEvent('alliance:rejectInvite', allianceId));

  // @Effect({ dispatch: false })
  // public updatePlayerRole$: Observable<any> = this.actions$
  //   .ofType(AllianceActions.UPDATE_MEMBER_ROLE)
  //   .map((action: ActionWithPayload) => action.payload)
  //   .map((payload) => this.socketService.sendEvent('alliance:updatePlayerRole', payload));

  // @Effect()
  // public updatePlayer$: Observable<any> = this.actions$
  //   .ofType(AllianceActions.UPDATE_MEMBER)
  //   .map((action: ActionWithPayload) => action.payload)
  //   .withLatestFrom(this.store.select(getPlayerData))
  //   .filter(([payload, player]) => player.id === payload.id)
  //   .map(([payload, player]) => ({
  //     type: PlayerActions.UPDATE,
  //     payload: {
  //       ...player,
  //       AllianceRoleId: payload.AllianceRole.id,
  //       AllianceRole: payload.AllianceRole
  //     } }));

  // @Effect({ dispatch: false })
  // public updateRolePermissions$: Observable<any> = this.actions$
  //   .ofType(AllianceActions.UPDATE_ROLE_PERMISSIONS)
  //   .map((action: ActionWithPayload) => action.payload)
  //   .map((payload) => this.socketService.sendEvent('alliance:updateRoles', payload));

  // @Effect({ dispatch: false })
  // public removeRole$: Observable<any> = this.actions$
  //   .ofType(AllianceActions.REMOVE_ROLE)
  //   .map((action: ActionWithPayload) => action.payload)
  //   .map((payload) => this.socketService.sendEvent('alliance:removeRole', payload));

  // @Effect({ dispatch: false })
  // public removePlayer$: Observable<any> = this.actions$
  //   .ofType(AllianceActions.REMOVE_PLAYER)
  //   .map((action: ActionWithPayload) => action.payload)
  //   .map((payload) => this.socketService.sendEvent('alliance:removePlayer', payload));

  // @Effect({ dispatch: false })
  // public leaveAlliance$: Observable<any> = this.actions$
  //   .ofType(AllianceActions.LEAVE_ALLIANCE)
  //   .map((payload) => this.socketService.sendEvent('alliance:leave'));

  // @Effect()
  // public removedMember$: Observable<any> = this.actions$
  //   .ofType(AllianceActions.REMOVED_MEMBER)
  //   .map((action: ActionWithPayload) => action.payload)
  //   .withLatestFrom(this.store.select(getPlayerData))
  //   .filter(([payload, player]) => player.id === payload.memberId)
  //   .map(([payload, player]) => ({
  //     type: PlayerActions.UPDATE,
  //     payload: {
  //       ...player,
  //       AllianceId: payload.alliance.id,
  //       Alliance: null,
  //     }
  //   }));

  // @Effect({ dispatch: false })
  // public attemptDestroying$: Observable<any> = this.actions$
  //   .ofType(AllianceActions.DESTROY)
  //   .map((payload) => this.socketService.sendEvent('alliance:destroy'));

  // @Effect({ dispatch: false })
  // public createForumCategory$: Observable<any> = this.actions$
  //   .ofType(AllianceActions.CREATE_FORUM_CATEGORY)
  //   .map((action: ActionWithPayload) => action.payload)
  //   .map((payload) => this.socketService.sendEvent('alliance:createForumCategory', payload));

  // @Effect({ dispatch: false })
  // public postMessage$: Observable<any> = this.actions$
  //   .ofType(AllianceActions.POST_MESSAGE)
  //   .map((action: ActionWithPayload) => action.payload)
  //   .map((payload) => this.socketService.sendEvent('alliance:postMessage', payload));

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<StoreState>,
    private socketService: SocketService,
  ) {console.log('effectado')}
}
