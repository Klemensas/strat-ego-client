import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Store, Action } from '@ngrx/store';

import { WorldActions, Load, WorldActionTypes, Loadsuccess, LoadFail } from './world.actions';
import { GameDataService } from '../services/game-data.service';
import { State } from '../reducers';
import { defer } from 'rxjs/observable/defer';

@Injectable()
export class WorldEffects {

  @Effect()
  public load$: Observable<Action> = this.actions$.pipe(
    ofType<Load>(WorldActionTypes.Load),
    switchMap(() =>
      this.dataService.getActiveWorlds().pipe(
        map((data) => new Loadsuccess(data)),
        catchError((error) => of(new LoadFail(error)))
      )
    ),
  );

  @Effect({ dispatch: false })
  public initLoad$: Observable<any> = defer(() => {
    return this.store.dispatch(new Load());
  });

  constructor(
    private actions$: Actions,
    private dataService: GameDataService,
    private router: Router,
    private store: Store<State>,
  ) {}
}
