import { Report } from './report.model';

export interface ReportState {
  inProgress: boolean;
  activeTown: number;
  reportData: Report;
}

export const initialReportState: ReportState = {
  inProgress: false,
  activeTown: null,
  reportData: null
};
