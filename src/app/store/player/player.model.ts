import { Report } from '../report/report.model';
import { Alliance, AllianceBase, AllianceRole } from '../alliance/alliance.model';

export interface Player {
  id: number;
  UserId: number;
  name: string;
  Towns: any[];
  ReportDestinationPlayer: Report[];
  ReportOriginPlayer: Report[];
  AllianceId: number;
  Alliance: Alliance;
  AllianceRoleId: number;
  AllianceRole: AllianceRole;
  Invitations: AllianceBase[];
  createdAt: string;
  updatedAt: string;
}
