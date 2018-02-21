import { ActionReducer } from '@ngrx/store';

import { ActionWithPayload } from '../util';
import { ReportState, initialReportState } from './report.state';
import { ReportActions } from './report.actions';

export const ReportReducer: ActionReducer<ReportState> = (state = initialReportState, action: ActionWithPayload) => {
  switch (action.type) {
    case ReportActions.UPDATE:
      return { ...state, reportData: action.payload };

    default: {
      return state;
    }
  }
};
