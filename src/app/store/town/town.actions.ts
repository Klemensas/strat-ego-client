import { Action } from '@ngrx/store';
import { Town, TownUpdatePayload, TownUpdateFormatted } from './town.model';
import { TownError, MovementType } from 'strat-ego-common';

export enum TownActionTypes {
  Update = '[Town] Update',
  Rename = '[Town] Rename',
  RenameSuccess = '[Town] Rename Success',
  RenameFail = '[Town] Rename Fail',
  Build = '[Town] Build',
  BuildSuccess = '[Town] Build Success',
  BuildFail = '[Town] Build Fail',
  Recruit = '[Town] Recruit',
  RecruitSuccess = '[Town] Recruit Success',
  RecruitFail = '[Town] Recruit Fail',
  MoveTroops = '[Town] Move Troops',
  MoveTroopsSuccess = '[Town] Move Troops Success',
  MoveTroopsFail = '[Town] Move Troops Fail',
  UpdateEvent = '[Town] Update Event',
  ScheduleUpdate = '[Town] Schedule Update',
  SetPlayerTowns = '[Town] Set Player Towns',
  SetActiveTown = '[Town] Set Active Town',
}

// TODO: merge Update and UpdateEvent actions. Consider refactoring logic to update specific parts
// TODO: specify types better, some i.e. some payloads are not of full town type
export class Update implements Action {
  readonly type = TownActionTypes.Update;

  constructor(public payload: TownUpdateFormatted) {}
}
export class Rename implements Action {
  readonly type = TownActionTypes.Rename;

  constructor(public payload: string) {}
}
export class RenameSuccess implements Action {
  readonly type = TownActionTypes.RenameSuccess;

  constructor(public payload: string) {}
}
export class RenameFail implements Action {
  readonly type = TownActionTypes.RenameFail;

  constructor(public payload: TownError) {}
}
export class Build implements Action {
  readonly type = TownActionTypes.Build;

  constructor(public payload: { building: string; level: number; }) {}
}
export class BuildSuccess implements Action {
  readonly type = TownActionTypes.BuildSuccess;

  constructor(public payload: Town) {}
}
export class BuildFail implements Action {
  readonly type = TownActionTypes.BuildFail;

  constructor(public payload: TownError) {}
}
export class Recruit implements Action {
  readonly type = TownActionTypes.Recruit;

  constructor(public payload: { type: string; amount: number; }[]) {}
}
export class RecruitSuccess implements Action {
  readonly type = TownActionTypes.RecruitSuccess;

  constructor(public payload: Town) {}
}
export class RecruitFail implements Action {
  readonly type = TownActionTypes.RecruitFail;

  constructor(public payload: TownError) {}
}
export class UpdateEvent implements Action {
  readonly type = TownActionTypes.UpdateEvent;

  constructor(public payload: TownUpdatePayload) {}
}
export class ScheduleUpdate implements Action {
  readonly type = TownActionTypes.ScheduleUpdate;

  constructor(public payload: number) {}
}
export class SetPlayerTowns implements Action {
  readonly type = TownActionTypes.SetPlayerTowns;

  constructor(public payload: TownUpdateFormatted) {}
}
export class SetActiveTown implements Action {
  readonly type = TownActionTypes.SetActiveTown;

  constructor(public payload: number) {}
}
export class MoveTroops implements Action {
  readonly type = TownActionTypes.MoveTroops;

  constructor(public payload: { type: MovementType; target: [number, number]; units: [string, number][] }) {}
}
export class MoveTroopsSuccess implements Action {
  readonly type = TownActionTypes.MoveTroopsSuccess;

  constructor(public payload: Town) {}
}
export class MoveTroopsFail implements Action {
  readonly type = TownActionTypes.MoveTroopsFail;

  constructor(public payload: TownError) {}
}

export type TownActions = Update |
  UpdateEvent |
  Rename |
  RenameSuccess |
  RenameFail |
  Build |
  BuildSuccess |
  BuildFail |
  Recruit |
  RecruitSuccess |
  RecruitFail |
  MoveTroops |
  MoveTroopsSuccess |
  MoveTroopsFail |
  ScheduleUpdate |
  SetPlayerTowns |
  SetActiveTown;
