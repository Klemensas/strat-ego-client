import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { PlayerActions } from './player.actions';
import { SocketService } from '../../game/services/socket.service';

@Injectable()
export class PlayerEffects {
  @Effect({ dispatch: false })
  public update$: Observable<any> = this.actions$
    .ofType(PlayerActions.RESTART)
    .map((data) => this.socketService.sendEvent('player:restart'));

  constructor(
    private actions$: Actions,
    private router: Router,
    private socketService: SocketService,
  ) {}
}
