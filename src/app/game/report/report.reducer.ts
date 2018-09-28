import { Report, Dict } from 'strat-ego-common';

import { ReportActions, ReportActionTypes } from './report.actions';

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
  action: ReportActions
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

    default: {
      return state;
    }
  }
}

export const getIds = (state: ReportState) => state.ids;
export const getEntities = (state: ReportState) => state.entities;
export const getReportList = (state: ReportState) => state.ids.map((id) => state.entities[id]);
