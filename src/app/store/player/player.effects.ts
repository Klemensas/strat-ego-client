import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';

import { PlayerActions } from './player.actions';
import { TownActions } from '../town/town.actions';
import { StoreState } from '../';
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
    private store: Store<StoreState>,
    private socketService: SocketService,
  ) {}
}
