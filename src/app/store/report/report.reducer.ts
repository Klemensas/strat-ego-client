import { ActionReducer } from '@ngrx/store';
import { Report } from 'strat-ego-common';

import { ActionWithPayload } from '../util';
import { ReportActions, ReportActionTypes } from './report.actions';

export interface ReportState {
  inProgress: boolean;
  activeTown: number;
  reportData: Report;
}

export const initialState: ReportState = {
  inProgress: false,
  activeTown: null,
  reportData: null
};


export function reducer(
  state = initialState,
  action: ReportActions
): ReportState {
  switch (action.type) {
    case ReportActionTypes.Update:
      return { ...state, reportData: action.payload };

    default: {
      return state;
    }
  }
}
