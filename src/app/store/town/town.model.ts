import { User } from '../user/';
import { Resources } from '../world';

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
  ReportDesinationTown: any[];
  ReportOriginTown: any[];
  UnitQueues: any[];
  createdAt: string;
  updatedAt: string;
};
