import { Action } from '@ngrx/store';

export enum MenuActionTypes {
  SetSidenav = '[Menu] Set sidenav',
}

export class SetSidenav implements Action {
  readonly type = MenuActionTypes.SetSidenav;

  constructor(public payload: { side: string, name: string }[]) {}
}

export type MenuActions = SetSidenav;
