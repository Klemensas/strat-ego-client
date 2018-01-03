import { Player } from '../player/player.model';
import { Town } from '../town/town.model';
import { Resources } from '../world/world.model';

export interface Haul {
  maxHaul: number;
  haul: Resources;
}

export interface CombatCasualties {
  units: { [name: string]: number };
  losses: { [name: string]: number };
}

export interface Report {
  id: string;
  outcome: string;
  origin: CombatCasualties;
  destination: CombatCasualties;
  haul: Haul;
  loyaltyChange: [number, number];
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
}
