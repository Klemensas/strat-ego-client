import { User } from '../user/user.model';
import { Report } from '../report/report.model';
import { Alliance, AllianceBase } from 'app/store/alliance/alliance.model';


export interface Player {
  id: number;
  UserId: number;
  name: string;
  Towns: any[];
  ReportDestinationPlayer: Report[];
  ReportOriginPlayer: Report[];
  AllianceId: number;
  Alliance: Alliance;
  allianceName: string;
  allianceRole: string;
  Invitations: AllianceBase[];
  createdAt: string;
  updatedAt: string;
};
