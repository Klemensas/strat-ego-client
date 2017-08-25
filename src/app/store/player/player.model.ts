import { User } from '../user/';

export interface Player {
  _id: string;
  UserId: string;
  name: string;
  Towns: any[];
  ReportDesinationPlayer: any[];
  ReportOriginPlayer: any[];
  createdAt: string;
  updatedAt: string;
};
