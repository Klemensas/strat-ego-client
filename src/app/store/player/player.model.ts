import { User } from '../user/user.model';
import { Report } from '../report/report.model';

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
