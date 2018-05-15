import { Action } from '@ngrx/store';
import { Player, ProfileUpdate } from 'strat-ego-common';

// TODO: move sidenav to a dedicated game state
export enum PlayerActionTypes {
  Update = '[Player] Update',
  SetSidenav = '[Player] Set Sidenav',
  Restart = '[Player] Restart',

  ViewProfile = '[Player] View Profile',
  LoadProfile = '[Player] Load Profile',
  LoadProfileSuccess = '[Player] Load Profile Success',
  UpdateProfile = '[Player] Update Profile',
  UpdateProfileSuccess = '[Player] Update Profile Success',
  RemoveAvatar = '[Player] Remove Avatar',
  RemoveAvatarSuccess = '[Player] Remove Avatar Success',

  // UpdateReports = '[Player] Update Reports',
}

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
export class UpdateProfile implements Action {
  readonly type = PlayerActionTypes.UpdateProfile;

  constructor(public payload: ProfileUpdate) {}
}
export class UpdateProfileSuccess implements Action {
  readonly type = PlayerActionTypes.UpdateProfileSuccess;

  constructor(public payload: ProfileUpdate) {}
}
export class RemoveAvatar implements Action {
  readonly type = PlayerActionTypes.RemoveAvatar;
}
export class RemoveAvatarSuccess implements Action {
  readonly type = PlayerActionTypes.RemoveAvatarSuccess;

  constructor(public payload: ProfileUpdate) {}
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
  UpdateProfile |
  UpdateProfileSuccess |
  RemoveAvatar |
  RemoveAvatarSuccess;
