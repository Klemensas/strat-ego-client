import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';

import { MapActions } from './map.actions';
import { TownActions } from '../town';
import { StoreState } from '../';
import { SocketService } from '../../game/services';
@Injectable()
export class MapEffects {
  @Effect({ dispatch: false })
  public loadMap$ = this.actions$
    .ofType(MapActions.LOAD_MAP)
    .map(() => this.socketService.sendEvent('map', {}));

  constructor(
    private actions$: Actions,
    private store: Store<StoreState>,
    private socketService: SocketService,
  ) {}
}
