import { User } from '../user/';

export interface Report {
  _id: string;
  UserId: string;
  name: string;
  Towns: any[];
  ReportDesinationReport: any[];
  ReportOriginReport: any[];
  createdAt: string;
  updatedAt: string;
};
