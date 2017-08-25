import { ActionReducer, Action } from '@ngrx/store';

import { ReportState, initialReportState } from './report.state';
import { ReportActions } from './report.actions';

export const ReportReducer: ActionReducer<ReportState> = (state = initialReportState, action: Action) => {
  switch (action.type) {
    case ReportActions.UPDATE:
      return { ...state, reportData: action.payload };

    default: {
      return state;
    }
  }
};
