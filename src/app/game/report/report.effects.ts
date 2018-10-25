import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Store, Action } from '@ngrx/store';

import { Initialize, ReportActionTypes } from './report.actions';
import { SocketService } from '../services';
import { GameModuleState, getPlayerEntities, getTownEntities } from '../reducers';
import { withLatestFrom, map, filter, concatMap } from 'rxjs/operators';
import { LoadProfiles, TownActionTypes } from '../town/town.actions';
import { Report } from 'strat-ego-common';

export interface ActionWithReport extends Action {
  payload: {
    report: Report;
  };
}

@Injectable()
export class ReportEffects {
  @Effect()
  public loadReportProfiles$: Observable<any> = this.actions$.pipe(
    ofType<Initialize | ActionWithReport>(
      ReportActionTypes.Initialize,
      TownActionTypes.AttackOutcome,
      TownActionTypes.Attacked,
      TownActionTypes.Lost,
      TownActionTypes.Conquered,
    ),
    withLatestFrom(
      this.store.select(getPlayerEntities),
      this.store.select(getTownEntities),
    ),
    map(([action, playerEntities, townEntities]) => {
      let reports: Report[];
      if (action instanceof Initialize) {
        reports = action.payload;
      } else {
        reports = [action.payload.report];
      }

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
