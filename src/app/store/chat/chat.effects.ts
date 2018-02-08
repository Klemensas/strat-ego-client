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

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<StoreState>,
    private socketService: SocketService,
  ) {}
}
