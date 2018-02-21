import { Action } from '@ngrx/store';
import { Town, TownUpdatePayload, TownUpdateFormatted } from './town.model';

export enum TownActionTypes {
  Update = '[Town] Update',
  UpdateEvent = '[Town] Update Event',
  ScheduleUpdate = '[Town] Schedule Update',
  SetPlayerTowns = '[Town] Set Player Towns',
  SetActiveTown = '[Town] Set Active Town',
  ChangeName = '[Town] Change Name',
  UpgradeBuilding = '[Town] Upgrade Building',
  Recruit = '[Town] Recruit',
  SendTroops = '[Town] Send Troops'
}

// TODO: merge Update and UpdateEvent actions. Consider refactoring logic to update specific parts
// TODO: specify types better, some i.e. some payloads are not of full town type
export class Update implements Action {
  readonly type = TownActionTypes.Update;

  constructor(public payload: TownUpdateFormatted) {}
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
export class ChangeName implements Action {
  readonly type = TownActionTypes.ChangeName;

  constructor(public payload: string) {}
}
export class UpgradeBuilding implements Action {
  readonly type = TownActionTypes.UpgradeBuilding;

  constructor(public payload: { building: string; level: number; }) {}
}
export class Recruit implements Action {
  readonly type = TownActionTypes.Recruit;

  constructor(public payload: { type: string; amount: number; }[]) {}
}
export class SendTroops implements Action {
  readonly type = TownActionTypes.SendTroops;

  constructor(public payload: { type: string; target: [number, number]; units: [string, number][] }) {}
}

export type TownActions = Update |
  UpdateEvent |
  ScheduleUpdate |
  SetPlayerTowns |
  SetActiveTown |
  ChangeName |
  UpgradeBuilding |
  Recruit |
  SendTroops;
