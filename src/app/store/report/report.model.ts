import { Player } from '../player';
import { Town } from '../town';
import { Resources } from '../world';

export interface Haul {
  maxHaul: number;
  haul: Resources;
}

export interface CombatCasualties {
  units: { [name: string]: number };
  losses: { [name: string]: number };
}

export interface Report {
  _id: string;
  outcome: string;
  origin: CombatCasualties;
  destination: CombatCasualties;
  haul: Haul;
  ReportOriginTownId: number;
  ReportDestinationTownId: number;
  ReportDestinationTown: Town;
  ReportOriginTown: Town;
  ReportOriginPlayerId: number;
  ReportDestinationPlayerId: number;
  ReportDestinationPlayer: Player;
  ReportOriginPlayer: Player;
  createdAt: string;
  updatedAt: string;
};
