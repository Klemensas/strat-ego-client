import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { MapActions, MapActionTypes, Update } from './map.actions';
import { GameModuleState } from '../reducers';
import { SocketService } from '../../game/services';

@Injectable()
export class MapEffects {
  @Effect({ dispatch: false })
  public loadMap$ = this.actions$.pipe(
    ofType(MapActionTypes.LoadMap),
    map(() => this.socketService.sendEvent('map', {}))
  );

  constructor(
    private actions$: Actions,
    private store: Store<GameModuleState>,
    private socketService: SocketService,
  ) {
    this.socketService.registerEvents([
      ['map', (payload) => this.store.dispatch(new Update(payload))]
    ]);
  }
}
