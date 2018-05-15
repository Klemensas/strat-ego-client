import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, withLatestFrom, filter, take } from 'rxjs/operators';

import { SocketService } from '../../game/services/socket.service';
import { Load, RankingsActionTypes, LoadSuccess, LoadFail, CheckForUpdate, LoadStagnated } from './rankings.actions';
import { GameModuleState, getRankingsUpdate, getCurrentPlayer } from '../../store';
import { SetSidenav, PlayerActionTypes } from '../../store/player/player.actions';

@Injectable()
export class RankingsEffects {
  @Effect({ dispatch: false })
  public loadRankings$: Observable<any> = this.actions$.pipe(
    ofType<Load>(RankingsActionTypes.Load),
    map(() => this.socketService.sendEvent('rankings:load'))
  );

  @Effect()
  public sidenavOpen$: Observable<any> = this.actions$.pipe(
    ofType<SetSidenav>(PlayerActionTypes.SetSidenav),
    filter((action) => action.payload.some(({ name }) => name === 'rankings' || name === 'alliance'  || name === 'allianceProfile')),
    map(() => new CheckForUpdate())
  );

  @Effect()
  public checkForUpdate$: Observable<any> = this.actions$.pipe(
    ofType<CheckForUpdate>(RankingsActionTypes.CheckForUpdate),
    withLatestFrom(this.store.select(getRankingsUpdate)),
    filter((data) => Date.now() - data[1].lastUpdate > data[1].updateFrequencey),
    map((data) => new Load(data[1].lastUpdate))
  );


  constructor(
    private actions$: Actions,
    private router: Router,
    private socketService: SocketService,
    private store: Store<GameModuleState>
  ) {
    this.socketService.registerEvents([
      ['rankings:loadSuccess', (payload) =>
        this.store.select(getCurrentPlayer)
          .pipe(take(1))
          .subscribe((player) => this.store.dispatch(new LoadSuccess({ rankings: payload, playerId: player.id })))
      ],
      ['rankings:loadFail', (payload) => this.store.dispatch(new LoadFail(payload))],
      ['rankings:loadStagnated', () => this.store.dispatch(new LoadStagnated())],
    ]);
  }
}
