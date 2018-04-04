import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, withLatestFrom, filter } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { Player, AllianceMessage } from 'strat-ego-common';

import { ChatActions, ChatActionTypes, PostMessage, Update, PostMessageSuccess, AddMessage } from './chat.actions';
import { GameModuleState, getChatMessages } from '../';
import { SocketService } from '../../game/services/socket.service';
import { PlayerActionTypes, Update as PlayerUpdate } from '../player/player.actions';
import { Action } from '@ngrx/store/src/models';

@Injectable()
export class ChatEffects {
  @Effect({ dispatch: false })
  public postMessage$: Observable<any> = this.actions$.pipe(
    ofType<PostMessage>(ChatActionTypes.PostMessage),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('chat:postMessage', payload))
  );

  @Effect()
  public update$: Observable<Action> = this.actions$.pipe(
    ofType<PlayerUpdate>(PlayerActionTypes.Update),
    map((action) => action.payload),
    withLatestFrom(this.store.select(getChatMessages)),
    filter(([player, messages]: [Player, AllianceMessage[]]) => !messages.length && player.Alliance && !!player.Alliance.Messages.length),
    map(([player]) => new Update(player.Alliance.Messages))
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<GameModuleState>,
    private socketService: SocketService,
  ) {
    this.socketService.registerEvents([
      ['chat:messageCreated', (payload) => this.store.dispatch(new PostMessageSuccess(payload))],
      ['chat:newMessage', (payload) => this.store.dispatch(new AddMessage(payload))]
    ]);
  }
}
