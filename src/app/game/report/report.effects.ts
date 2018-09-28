import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Initialize, ReportActionTypes } from './report.actions';
import { SocketService } from '../services';
import { GameModuleState, getPlayerEntities, getTownEntities } from '../reducers';
import { withLatestFrom, map, filter, concatMap } from 'rxjs/operators';
import { LoadProfiles } from '../town/town.actions';

@Injectable()
export class ReportEffects {
  @Effect()
  public loadReportProfiles$: Observable<any> = this.actions$.pipe(
    ofType<Initialize>(ReportActionTypes.Initialize, ReportActionTypes.Add),
    withLatestFrom(
      this.store.select(getPlayerEntities),
      this.store.select(getTownEntities),
    ),
    map(([action, playerEntities, townEntities]) => {
      const reports = Array.isArray(action.payload) ? action.payload : [action.payload];
      return reports.reduce((result, { targetPlayerId, originPlayerId, targetTownId, originTownId }) => {
        if (targetPlayerId && !playerEntities[targetPlayerId]) { result.missingPlayerIds.add(targetPlayerId); }
        if (originPlayerId && !playerEntities[originPlayerId]) { result.missingPlayerIds.add(originPlayerId); }
        if (targetTownId && !townEntities[targetTownId]) { result.missingTownIds.add(targetTownId); }
        if (originTownId && !townEntities[originTownId]) { result.missingTownIds.add(originTownId); }

        return result;
      }, { missingTownIds: new Set(), missingPlayerIds: new Set() });
    }),
    filter((payload) => !!payload.missingTownIds.size || !!payload.missingPlayerIds.size),
    concatMap((payload) => {
      const actions = [];
      if (payload.missingTownIds.size) { actions.push(new LoadProfiles([...payload.missingTownIds])); }
      if (payload.missingPlayerIds.size) { actions.push(new LoadProfiles([...payload.missingPlayerIds])); }
      return actions;
    }),
  );

  constructor(
    private actions$: Actions,
    private socketService: SocketService,
    private store: Store<GameModuleState>
  ) {
    this.socketService.registerEvents([
      ['initialize', (payload) => this.store.dispatch(new Initialize(payload.reports))],
    ]);
  }
}
