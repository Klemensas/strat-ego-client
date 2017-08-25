import { User } from '../user/';

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
