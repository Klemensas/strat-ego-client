import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, withLatestFrom, filter, take } from 'rxjs/operators';

import { SocketService } from '../../game/services/socket.service';
import * as messageActions from './message.actions';
import { GameModuleState, getCurrentPlayer } from '../reducers';

@Injectable()
export class MessageEffects {
  // @Effect({ dispatch: false })
  // public loadMessage$: Observable<any> = this.actions$.pipe(
  //   ofType<Load>(MessageActionTypes.Load),
  //   map(() => this.socketService.sendEvent('Message:load'))
  // );

  @Effect({ dispatch: false })
  public create$: Observable<any> = this.actions$.pipe(
    ofType<messageActions.Create>(messageActions.MessageActionTypes.Create),
    map(({ payload }) => this.socketService.sendEvent('message:create', payload))
  );

  constructor(
    private actions$: Actions,
    private socketService: SocketService,
    private store: Store<GameModuleState>
  ) {
    this.socketService.registerEvents([
      ['initialize', (payload) => this.store.dispatch(new messageActions.Initialize(payload.messages))],
      ['message:createSuccess', (payload) => this.store.dispatch(new messageActions.CreateSuccess(payload))],
      ['message:createFail', (payload) => this.store.dispatch(new messageActions.CreateFail(payload))],

      ['message:threadReceived', (payload) => this.store.dispatch(new messageActions.ThreadReceived(payload))],
    ]);
  }
}
