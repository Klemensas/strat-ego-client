import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import { Store } from '@ngrx/store';

import { WorldActions } from './world.actions';
import { GameDataService } from '../../services/game-data.service';
import { StoreState } from '../';

@Injectable()
export class WorldEffects {
  @Effect()
  public initLoad$: Observable<any> = defer(() => this.store.dispatch({ type: WorldActions.LOAD }));

  @Effect()
  public load$: Observable<Action> = this.actions$
    .ofType(WorldActions.LOAD)
    .map(toPayload)
    .switchMap((credentials) => this.dataService.getActiveWorlds()
      .map((data) => ({ type: WorldActions.LOAD_SUCCESS, payload: data }))
      .catch((error) => of({ type: WorldActions.LOAD_FAIL, payload: error }))
    );

    constructor(
    private actions$: Actions,
    private dataService: GameDataService,
    private router: Router,
    private store: Store<StoreState>,
  ) {}
}
