import { Report, Dict } from 'strat-ego-common';

import { ReportActions, ReportActionTypes } from './report.actions';
import { TownActionTypes, TownActions } from '../town/town.actions';

export interface ReportState {
  inProgress: boolean;
  ids: number[];
  entities: Dict<Report>;
}

export const initialState: ReportState = {
  inProgress: false,
  ids: [],
  entities: {},
};


export function reducer(
  state = initialState,
  action: ReportActions | TownActions
): ReportState {
  switch (action.type) {
    case ReportActionTypes.Initialize: {
      const { ids, entities } = action.payload.reduce((result, report) => {
        result.ids.push(report.id);
        result.entities[report.id] = report;
        return result;
      }, { ids: [], entities: {} });

      return {
        ...state,
        ids,
        entities,
      };
    }

    case TownActionTypes.AttackOutcome:
    case TownActionTypes.Attacked:
    case TownActionTypes.Lost:
    case TownActionTypes.Conquered: {
      const report = action.payload.report;
      return {
        ...state,
        ids: [report.id, ...state.ids],
        entities: {
          ...state.entities,
        [report.id]: report,
        }
      };
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: ReportState) => state.ids;
export const getEntities = (state: ReportState) => state.entities;
export const getReportList = (state: ReportState) => state.ids.map((id) => state.entities[id]);
