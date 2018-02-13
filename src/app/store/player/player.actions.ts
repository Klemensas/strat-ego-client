import { Action } from '@ngrx/store';

import { Player } from './player.model';

export enum PlayerActionTypes {
  Update = '[Player] Update',
  SetSidenav = '[Player] Set Sidenav',
  // UpdateReports = '[Player] Update Reports',
  Restart = '[Player] Restart',
}

export class Update implements Action {
  readonly type = PlayerActionTypes.Update;

  constructor(public payload: Player) {}
}
export class SetSidenav implements Action {
  readonly type = PlayerActionTypes.SetSidenav;

  constructor(public payload: { side: string, name: string }[]) {}
}
// export class UpdateReports implements Action {
//   readonly type = PlayerActionTypes.UpdateReports;

//   constructor(public payload:) {}
// }
export class Restart implements Action {
  readonly type = PlayerActionTypes.Restart;
}

export type PlayerActions = Update |
  SetSidenav |
  Restart;

