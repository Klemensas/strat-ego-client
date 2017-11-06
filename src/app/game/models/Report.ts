import { Resources, TownMinData } from './';

export class CombatUnitData {
  units: {
    [index: string]: number;
  };
  losses: {
    [index: string]: number;
  };
}

export class Report {
  _id: number;
  type: string;
  outcome: string;
  updatedAt: string;
  createdAt: string;
  haul: {
    haul: Resources;
    maxHaul: number;
  };
  isCollapsed?: boolean;
  result: any;
  ReportOriginPlayerId: number;
  ReportDestinationPlayerId?: number;
  ReportOriginTownId: number;
  ReportDestinationTownId: number;
  ReportOriginTown: TownMinData;
  ReportDestinationTown: TownMinData;
  origin: CombatUnitData;
  destination: CombatUnitData;
}
