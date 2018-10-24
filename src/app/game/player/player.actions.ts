import { Action } from '@ngrx/store';
import { Player, ProfileUpdate, ActionError, Report, PlayerProfile } from 'strat-ego-common';

export enum PlayerActionTypes {
  Initialize = '[Player] Initialize',

  Update = '[Player] Update',
  Restart = '[Player] Restart',

  ViewProfile = '[Player] View Profile',
  UpdateProfile = '[Player] Update Profile',
  UpdateProfileSuccess = '[Player] Update Profile Success',
  UpdateProfileFail = '[Player] Update Profile Fail',
  RemoveAvatar = '[Player] Remove Avatar',
  RemoveAvatarSuccess = '[Player] Remove Avatar Success',
  RemoveAvatarFail = '[Player] Remove Avatar Fail',
  ProgressTutorial = '[Player] Progress Tutorial',
  ProgressTutorialSuccess = '[Player] Progress Tutorial Success',
  ProgressTutorialFail = '[Player] Progress Tutorial Fail',

  LoadProfiles = '[Player] Load Profiles',
  LoadProfilesSuccess = '[Player] Load Profiles Success',
  LoadProfilesFail = '[Player] Load Profiles Fail',

  AddReport = '[Player][Affected] Add Report',
}

export const PlayerSuccessActions = [
  PlayerActionTypes.LoadProfilesSuccess,
  PlayerActionTypes.UpdateProfileSuccess,
  PlayerActionTypes.RemoveAvatarSuccess,
];
export const PlayerFailActions = [
  PlayerActionTypes.LoadProfilesFail,
  PlayerActionTypes.UpdateProfileFail,
  PlayerActionTypes.RemoveAvatarFail,
];

export class Update implements Action {
  readonly type = PlayerActionTypes.Update;

  constructor(public payload: Player) {}
}
export class Initialize implements Action {
  readonly type = PlayerActionTypes.Initialize;

  constructor(public payload: Player) {}
}
export class Restart implements Action {
  readonly type = PlayerActionTypes.Restart;
}
export class ViewProfile implements Action {
  readonly type = PlayerActionTypes.ViewProfile;

  constructor(public payload: number) {}
}
export class LoadProfiles implements Action {
  readonly type = PlayerActionTypes.LoadProfiles;

  constructor(public payload: number[]) {}
}
export class LoadProfilesSuccess implements Action {
  readonly type = PlayerActionTypes.LoadProfilesSuccess;

  constructor(public payload: PlayerProfile[]) {}
}
export class LoadProfilesFail implements Action {
  readonly type = PlayerActionTypes.LoadProfilesFail;

  constructor(public payload: ActionError) {}
}
export class UpdateProfile implements Action {
  readonly type = PlayerActionTypes.UpdateProfile;

  constructor(public payload: ProfileUpdate) {}
}
export class UpdateProfileSuccess implements Action {
  readonly type = PlayerActionTypes.UpdateProfileSuccess;

  constructor(public payload: ProfileUpdate) {}
}
export class UpdateProfileFail implements Action {
  readonly type = PlayerActionTypes.UpdateProfileFail;

  constructor(public payload: ActionError) {}
}
export class RemoveAvatar implements Action {
  readonly type = PlayerActionTypes.RemoveAvatar;
}
export class RemoveAvatarSuccess implements Action {
  readonly type = PlayerActionTypes.RemoveAvatarSuccess;

  constructor(public payload: ProfileUpdate) {}
}
export class RemoveAvatarFail implements Action {
  readonly type = PlayerActionTypes.RemoveAvatarFail;

  constructor(public payload: ActionError) {}
}
export class ProgressTutorial implements Action {
  readonly type = PlayerActionTypes.ProgressTutorial;
}
export class ProgressTutorialSuccess implements Action {
  readonly type = PlayerActionTypes.ProgressTutorialSuccess;
}
export class ProgressTutorialFail implements Action {
  readonly type = PlayerActionTypes.ProgressTutorialFail;

  constructor(public payload: ActionError) {}
}
export class AddReport implements Action {
  readonly type = PlayerActionTypes.AddReport;

  constructor(public payload: { side: string, report: Report }) {}
}

export type PlayerActions = Update
  | Initialize
  | Restart
  | ViewProfile
  | LoadProfiles
  | LoadProfilesSuccess
  | LoadProfilesFail
  | UpdateProfile
  | UpdateProfileSuccess
  | UpdateProfileFail
  | RemoveAvatar
  | RemoveAvatarSuccess
  | RemoveAvatarFail
  | ProgressTutorial
  | ProgressTutorialSuccess
  | ProgressTutorialFail
  | AddReport
;
