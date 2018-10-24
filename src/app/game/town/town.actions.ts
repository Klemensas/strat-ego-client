import { Action } from '@ngrx/store';
import { ActionError, MovementType, Coords, Dict, RecallPayload, Movement, TownSupport, TownProfile } from 'strat-ego-common';

import { Town } from './town.model';

export const enum TownActionTypes {
  Initialize = '[Town] Initialize',

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
  RecallSupport = '[Town] Recall Support',
  RecallSupportSuccess = '[Town] Recall Support Success',
  RecallSupportFail = '[Town] Recall Support Fail',
  SendBackSupport = '[Town] Send Back Support',
  SendBackSupportSuccess = '[Town] Send Back Support Success',
  SendBackSupportFail = '[Town] Send Back Support Fail',
  SetActiveTown = '[Town] Set Active Town',

  LoadProfilesSuccess = '[Town] Load Profiles Success',

  IncomingMovement = '[Town][Affected] Incoming Movement',
  SupportRecalled = '[Town][Affected] Support Recalled',
  SupportSentBack = '[Town][Affected] Support Sent Back',
  Lost = '[Town][Affected] Lost',
  Conquered = '[Town][Affected] Conquered',
  SupportDisbanded = '[Town][Affected] Support Disbanded',
  MovementDisbanded = '[Town][Affected] Movement Disbanded',
  SentSupportDestroyed = '[Town][Affected] Sent Support Destroyed',
  SentSupportUpdated = '[Town][Affected] Sent Support Updated',
}

export const TownSuccessActions = [
  TownActionTypes.RenameSuccess,
  TownActionTypes.BuildSuccess,
  TownActionTypes.RecruitSuccess,
  TownActionTypes.MoveTroopsSuccess,
  TownActionTypes.RecallSupportSuccess,
  TownActionTypes.SendBackSupportSuccess
];
export const TownFailActions = [
  TownActionTypes.RenameFail,
  TownActionTypes.BuildFail,
  TownActionTypes.RecruitFail,
  TownActionTypes.MoveTroopsFail,
  TownActionTypes.RecallSupportFail,
  TownActionTypes.SendBackSupportFail
];

// TODO: once decided on queue implementation change payload accordingly
// I.e. might need to only send the changes instead of full town payload

export class Initialize implements Action {
  readonly type = TownActionTypes.Initialize;

  constructor(public payload: Town[]) {}
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

  constructor(public payload: ActionError) {}
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

  constructor(public payload: ActionError) {}
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

  constructor(public payload: ActionError) {}
}
export class SetPlayerTowns implements Action {
  readonly type = TownActionTypes.SetPlayerTowns;

  constructor(public payload: Town[]) {}
}
export class SetActiveTown implements Action {
  readonly type = TownActionTypes.SetActiveTown;

  constructor(public payload: number) {}
}
export class MoveTroops implements Action {
  readonly type = TownActionTypes.MoveTroops;

  constructor(public payload: { type: MovementType; target: Coords; units: Dict<number> }) {}
}
export class MoveTroopsSuccess implements Action {
  readonly type = TownActionTypes.MoveTroopsSuccess;

  constructor(public payload: Town) {}
}
export class MoveTroopsFail implements Action {
  readonly type = TownActionTypes.MoveTroopsFail;

  constructor(public payload: ActionError) {}
}
export class RecallSupport implements Action {
  readonly type = TownActionTypes.RecallSupport;

  constructor(public payload: number) {}
}
export class RecallSupportSuccess implements Action {
  readonly type = TownActionTypes.RecallSupportSuccess;

  constructor(public payload: RecallPayload) {}
}
export class RecallSupportFail implements Action {
  readonly type = TownActionTypes.RecallSupportFail;

  constructor(public payload: ActionError) {}
}
export class SendBackSupport implements Action {
  readonly type = TownActionTypes.SendBackSupport;

  constructor(public payload: number) {}
}
export class SendBackSupportSuccess implements Action {
  readonly type = TownActionTypes.SendBackSupportSuccess;

  constructor(public payload: number) {}
}
export class SendBackSupportFail implements Action {
  readonly type = TownActionTypes.SendBackSupportFail;

  constructor(public payload: ActionError) {}
}
export class IncomingMovement implements Action {
  readonly type = TownActionTypes.IncomingMovement;

  constructor(public payload: Movement) {}
}
export class SupportRecalled implements Action {
  readonly type = TownActionTypes.SupportRecalled;

  constructor(public payload: { support: number; town: number }) {}
}
export class SupportSentBack implements Action {
  readonly type = TownActionTypes.SupportSentBack;

  constructor(public payload: RecallPayload) {}
}
export class Lost implements Action {
  readonly type = TownActionTypes.Lost;

  constructor(public payload: number) {}
}
export class Conquered implements Action {
  readonly type = TownActionTypes.Conquered;

  constructor(public payload: Town) {}
}
export class SupportDisbanded implements Action {
  readonly type = TownActionTypes.SupportDisbanded;

  constructor(public payload: { id: number; townId: number }) {}
}
export class SentSupportDestroyed implements Action {
  readonly type = TownActionTypes.SentSupportDestroyed;

  constructor(public payload: { id: number; townId: number }) {}
}
export class SentSupportUpdated implements Action {
  readonly type = TownActionTypes.SentSupportUpdated;

  constructor(public payload: { id: number; townId: number, changes: Partial<TownSupport> }) {}
}
export class MovementDisbanded implements Action {
  readonly type = TownActionTypes.MovementDisbanded;

  constructor(public payload: { id: number; townId: number }) {}
}
export class LoadProfilesSuccess implements Action {
  readonly type = TownActionTypes.LoadProfilesSuccess;

  constructor(public payload: Dict<TownProfile>) {}
}
// SupportDisbanded = '[Town][Affected] Support Disbanded',
// MovementDisbanded = '[Town][Affected] Movement Disbanded',
// SentSupportDestroyed = '[Town][Affected] Sent Support Destroyed',
// SentSupportUpdated = '[Town][Affected] Sent Support Updated',


export type TownActions = Initialize
  | Rename
  | RenameSuccess
  | RenameFail
  | Build
  | BuildSuccess
  | BuildFail
  | Recruit
  | RecruitSuccess
  | RecruitFail
  | MoveTroops
  | MoveTroopsSuccess
  | MoveTroopsFail
  | RecallSupport
  | RecallSupportSuccess
  | RecallSupportFail
  | SendBackSupport
  | SendBackSupportSuccess
  | SendBackSupportFail
  | SetActiveTown
  | IncomingMovement
  | SupportRecalled
  | SupportSentBack
  | Lost
  | Conquered
  | SupportDisbanded
  | SentSupportDestroyed
  | SentSupportUpdated
  | MovementDisbanded
  | LoadProfilesSuccess
;
