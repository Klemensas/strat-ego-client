import { Action } from '@ngrx/store';

import { Player } from './player.model';

// TODO: move sidenav to a dedicated game state
export enum PlayerActionTypes {
  Update = '[Player] Update',
  SetSidenav = '[Player] Set Sidenav',
  Restart = '[Player] Restart',
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
// export class UpdateReports implements Action {
//   readonly type = PlayerActionTypes.UpdateReports;

//   constructor(public payload:) {}
// }

export type PlayerActions = Update |
  SetSidenav |
  Restart;

