import { Action } from '@ngrx/store';
import { Dict } from 'strat-ego-common';

export enum MapActionTypes {
  LoadMap = '[Map] LoadMap',
  Update = '[Map] Update',
}

export class LoadMap implements Action {
  readonly type = MapActionTypes.LoadMap;
}
export class Update implements Action {
  readonly type = MapActionTypes.Update;

  constructor(public payload: Dict<number>) {}
}

export type MapActions = LoadMap |
  Update;
