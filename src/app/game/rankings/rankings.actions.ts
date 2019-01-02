import { Action } from '@ngrx/store';
import { Player, PlayerProfile } from 'strat-ego-common';

export enum RankingsActionTypes {
  Load = '[Rankings] Load',
  LoadSuccess = '[Rankings] LoadSuccess',
  LoadFail = '[Rankings] LoadFail',
  LoadStagnated = '[Rankings] LoadStagnated',
  CheckForUpdate  = '[Rankings] CheckForUpdate',
}

export class Load implements Action {
  readonly type = RankingsActionTypes.Load;

  constructor(public payload?: number) {}
}
export class LoadSuccess implements Action {
  readonly type = RankingsActionTypes.LoadSuccess;

  constructor(public payload: { rankings: number[], playerId: number }) {}
}
export class LoadFail implements Action {
  readonly type = RankingsActionTypes.LoadFail;

  constructor(public payload: any) {}
}
export class LoadStagnated implements Action {
  readonly type = RankingsActionTypes.LoadStagnated;
}
export class CheckForUpdate implements Action {
  readonly type = RankingsActionTypes.CheckForUpdate;
}


export type RankingsActions = Load |
  LoadSuccess |
  LoadFail |
  LoadStagnated |
  CheckForUpdate;

