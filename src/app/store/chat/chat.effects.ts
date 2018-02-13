import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, withLatestFrom, filter } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';

import { ChatActions } from './chat.actions';
import { GameModuleState } from '../';
import { SocketService } from '../../game/services/socket.service';
import { ActionWithPayload } from '../util';
import { PlayerActionTypes, Update } from '../player/player.actions';
import { Action } from '@ngrx/store/src/models';
import { Player } from '../player/player.model';
import { getChatMessages } from './chat.selectors';
import { AllianceMessage } from '../alliance/alliance.model';

@Injectable()
export class ChatEffects {
  @Effect({ dispatch: false })
  public postMessage$: Observable<any> = this.actions$.pipe(
    ofType(ChatActions.POST_MESSAGE),
    map((action: ActionWithPayload) => action.payload),
    map((payload) => this.socketService.sendEvent('chat:postMessage', payload))
  );

  @Effect()
  public update$: Observable<Action> = this.actions$.pipe(
    ofType<Update>(PlayerActionTypes.Update),
    map((action) => action.payload),
    withLatestFrom(this.store.select(getChatMessages)),
    filter(([player, messages]: [Player, AllianceMessage[]]) => !messages.length && player.Alliance && !!player.Alliance.Messages.length),
    map(([player]) => ({
      type: ChatActions.UPDATE,
      payload: player.Alliance.Messages
    }))
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<GameModuleState>,
    private socketService: SocketService,
  ) {}
}
