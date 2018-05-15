import { Action } from '@ngrx/store';
import { Dict, MapTown } from 'strat-ego-common';

export enum MapActionTypes {
  LoadMap = '[Map] LoadMap',
  Update = '[Map] Update',
}

export class LoadMap implements Action {
  readonly type = MapActionTypes.LoadMap;
}
export class Update implements Action {
  readonly type = MapActionTypes.Update;

  constructor(public payload: Dict<MapTown>) {}
}

export type MapActions = LoadMap |
  Update;
