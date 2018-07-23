import { Action } from '@ngrx/store';
import { Player, ProfileUpdate, ActionError } from 'strat-ego-common';

// TODO: move sidenav to a dedicated game state
export enum PlayerActionTypes {
  Update = '[Player] Update',
  SetSidenav = '[Player] Set Sidenav',
  Restart = '[Player] Restart',

  ViewProfile = '[Player] View Profile',
  LoadProfile = '[Player] Load Profile',
  LoadProfileSuccess = '[Player] Load Profile Success',
  LoadProfileFail = '[Player] Load Profile Fail',
  UpdateProfile = '[Player] Update Profile',
  UpdateProfileSuccess = '[Player] Update Profile Success',
  UpdateProfileFail = '[Player] Update Profile Fail',
  RemoveAvatar = '[Player] Remove Avatar',
  RemoveAvatarSuccess = '[Player] Remove Avatar Success',
  RemoveAvatarFail = '[Player] Remove Avatar Fail',
  ProgressTutorial = '[Player] Progress Tutorial',
  ProgressTutorialSuccess = '[Player] Progress Tutorial Success',
  ProgressTutorialFail = '[Player] Progress Tutorial Fail',

  // UpdateReports = '[Player] Update Reports',
}

export const PlayerSuccessActions = [
  PlayerActionTypes.LoadProfileSuccess,
  PlayerActionTypes.UpdateProfileSuccess,
  PlayerActionTypes.RemoveAvatarSuccess,
];
export const PlayerFailActions = [
  PlayerActionTypes.LoadProfileFail,
  PlayerActionTypes.UpdateProfileFail,
  PlayerActionTypes.RemoveAvatarFail,
];

export class Update implements Action {
  readonly type = PlayerActionTypes.Update;

  constructor(public payload: Player) {}
}
export class SetSidenav implements Action {
  readonly type = PlayerActionTypes.SetSidenav;

  constructor(public payload: { side: string, name: string }[]) {}
}
export class Restart implements Action {
  readonly type = PlayerActionTypes.Restart;
}
export class ViewProfile implements Action {
  readonly type = PlayerActionTypes.ViewProfile;

  constructor(public payload: number) {}
}
export class LoadProfile implements Action {
  readonly type = PlayerActionTypes.LoadProfile;

  constructor(public payload: number) {}
}
export class LoadProfileSuccess implements Action {
  readonly type = PlayerActionTypes.LoadProfileSuccess;

  constructor(public payload: Partial<Player>) {}
}
export class LoadProfileFail implements Action {
  readonly type = PlayerActionTypes.LoadProfileFail;

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
// export class UpdateReports implements Action {
//   readonly type = PlayerActionTypes.UpdateReports;

//   constructor(public payload:) {}
// }

export type PlayerActions = Update |
  SetSidenav |
  Restart |
  ViewProfile |
  LoadProfile |
  LoadProfileSuccess |
  LoadProfileFail |
  UpdateProfile |
  UpdateProfileSuccess |
  UpdateProfileFail |
  RemoveAvatar |
  RemoveAvatarSuccess |
  RemoveAvatarFail |
  ProgressTutorial |
  ProgressTutorialSuccess |
  ProgressTutorialFail;
