import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ChatActionTypes, PostMessage, PostMessageSuccess, AddMessage } from './chat.actions';
import { GameModuleState } from '../reducers';
import { SocketService } from '../../game/services/socket.service';

@Injectable()
export class ChatEffects {
  @Effect({ dispatch: false })
  public postMessage$: Observable<any> = this.actions$.pipe(
    ofType<PostMessage>(ChatActionTypes.PostMessage),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('chat:postMessage', payload))
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<GameModuleState>,
    private socketService: SocketService,
  ) {
    this.socketService.registerEvents([
      ['chat:postMessageSuccess', (payload) => this.store.dispatch(new PostMessageSuccess(payload))],
      ['chat:newMessage', (payload) => this.store.dispatch(new AddMessage(payload))]
    ]);
  }
}
