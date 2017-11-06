import { User } from '../user/';
import { Report } from '../report/';

export interface Player {
  _id: string;
  UserId: string;
  name: string;
  Towns: any[];
  ReportDestinationPlayer: Report[];
  ReportOriginPlayer: Report[];
  createdAt: string;
  updatedAt: string;
};
