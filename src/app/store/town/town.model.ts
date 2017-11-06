import { Observable } from 'rxjs/Observable';

import { User } from '../user/';
import { Resources } from '../world';
import { Report } from '../report';

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

export const TownDefaultActionState: TownActionState = {
  build: false,
  name: false,
  movement: false,
  recruit: false,
}

export interface TownUnit {
  inside: number;
  outside: number;
  queued: number;
  amount?: number;
}

export interface Town {
  _id: number;
  name: string;
  buildings: {
    [name: string]: {
      level: number;
      queued: number;
    };
  };
  loaylty: number;
  location: [number, number];
  production: Resources;
  population: TownPopulation;
  storage: number;
  recruitmentModifier: number;
  resources: Resources;
  units: {
    [name: string]: TownUnit
  }
  BuildingQueues: any[];
  MovementDestinationTown: any[];
  MovementOriginTown: any[];
  PlayerId: number;
  Player: {
    _id: string;
    UserId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }
  ReportDestinationTown: Report;
  ReportOriginTown: Report;
  UnitQueues: any[];
  createdAt: string;
  updatedAt: string;
  availableResources$: Observable<Resources>;
  _actionState: TownActionState;
};
