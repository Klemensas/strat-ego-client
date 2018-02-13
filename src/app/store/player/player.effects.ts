import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { PlayerActions, PlayerActionTypes, Restart } from './player.actions';
import { SocketService } from '../../game/services/socket.service';

@Injectable()
export class PlayerEffects {
  @Effect({ dispatch: false })
  public restart$: Observable<any> = this.actions$.pipe(
    ofType<Restart>(PlayerActionTypes.Restart),
    map((data) => this.socketService.sendEvent('player:restart'))
  );


  constructor(
    private actions$: Actions,
    private router: Router,
    private socketService: SocketService,
  ) {}
}
