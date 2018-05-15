import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, withLatestFrom } from 'rxjs/operators';

import * as playerActions from './player.actions';
import { SocketService } from '../../game/services/socket.service';
import { GameModuleState, getPlayers } from '..';

@Injectable()
export class PlayerEffects {
  @Effect({ dispatch: false })
  public restart$: Observable<any> = this.actions$.pipe(
    ofType<playerActions.Restart>(playerActions.PlayerActionTypes.Restart),
    map((data) => this.socketService.sendEvent('player:restart'))
  );

  @Effect()
  public viewProfile$: Observable<any> = this.actions$.pipe(
    ofType<playerActions.ViewProfile>(playerActions.PlayerActionTypes.ViewProfile),
    map((action) => action.payload),
    withLatestFrom(this.store.select(getPlayers)),
    map(([payload, players]) => {
      const player = players[payload];
      if (!player) { this.socketService.sendEvent('player:loadProfile', payload); }
      return new playerActions.SetSidenav([{ side: 'right', name: 'playerProfile' }]);
    })
  );

  @Effect({ dispatch: false })
  public updateProfile$: Observable<any> = this.actions$.pipe(
    ofType<playerActions.UpdateProfile>(playerActions.PlayerActionTypes.UpdateProfile),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('player:updateProfile', payload))
  );

  @Effect({ dispatch: false })
  public removeAvatar$: Observable<any> = this.actions$.pipe(
    ofType<playerActions.RemoveAvatar>(playerActions.PlayerActionTypes.RemoveAvatar),
    map(() => this.socketService.sendEvent('player:removeAvatar'))
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private socketService: SocketService,
    private store: Store<GameModuleState>
  ) {
    this.socketService.registerEvents([
      ['player', (payload) => this.store.dispatch(new playerActions.Update(payload))],
      ['player:loadProfileSuccess', (payload) => this.store.dispatch(new playerActions.LoadProfileSuccess(payload))],
      ['player:updateProfileSuccess', (payload) => this.store.dispatch(new playerActions.UpdateProfileSuccess(payload))],
      ['player:removeAvatarSuccess', (payload) => this.store.dispatch(new playerActions.RemoveAvatarSuccess(payload))],
    ]);
  }
}
