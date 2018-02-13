import { Observable } from 'rxjs/Observable';

import { Report } from '../report/report.model';
import { Resources } from '../../world/world.model';

export interface TownActionState {
  name: boolean;
  build: boolean;
  movement: boolean;
  recruit: boolean;
}

export interface TownPopulation {
  total: number;
  used: number;
  available: number;
}

export interface TownUnit {
  inside: number;
  outside: number;
  queued: number;
  amount?: number;
}


// From server
export interface TownUpdatePayload {
  event: { type: string };
  town: Town;
}

// Formatted
export interface TownUpdateFormatted {
  event?: string;
  towns: Town[];
}

export interface Town {
  id: number;
  name: string;
  buildings: {
    [name: string]: {
      level: number;
      queued: number;
    };
  };
  loyalty: number;
  location: [number, number];
  production: Resources;
  population: TownPopulation;
  storage: number;
  recruitmentModifier: number;
  resources: Resources;
  units: {
    [name: string]: TownUnit
  };
  BuildingQueues: any[];
  MovementDestinationTown: any[];
  MovementOriginTown: any[];
  PlayerId: number;
  Player: {
    id: string;
    UserId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  ReportDestinationTown: Report;
  ReportOriginTown: Report;
  UnitQueues: any[];
  createdAt: string;
  updatedAt: string;
  availableResources$?: Observable<Resources>;
  _actionState: TownActionState;
}
