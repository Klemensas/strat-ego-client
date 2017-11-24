import { User } from '../user/user.model';

export interface Map {
  _id: string;
  UserId: string;
  name: string;
  Towns: any[];
  ReportDesinationMap: any[];
  ReportOriginMap: any[];
  createdAt: string;
  updatedAt: string;
};
