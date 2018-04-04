import { Observable } from 'rxjs/Observable';
import { Town as BaseTown, TownError, Report } from 'strat-ego-common';

export interface TownAction {
  inProgress: boolean;
  error: TownError;
}

export interface TownActionState {
  name: TownAction;
  build: TownAction;
  movement: TownAction;
  recruit: TownAction;
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

export interface Town extends BaseTown {
  population: TownPopulation;
  storage: number;
  recruitmentModifier: number;
  _actionState: TownActionState;
}
