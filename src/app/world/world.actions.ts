import { Action } from '@ngrx/store';

import { WorldData } from './world.model';

export enum WorldActionTypes {
  Load = '[World] Load',
  Loadsuccess = '[World] Load Success',
  LoadFail = '[World] Load Fail',
  SelectWorld = '[World] Select World'
}

export class Load implements Action {
  readonly type = WorldActionTypes.Load;
}

export class Loadsuccess implements Action {
  readonly type = WorldActionTypes.Loadsuccess;

  constructor(public payload: WorldData[]) {}
}

export class LoadFail implements Action {
  readonly type = WorldActionTypes.LoadFail;

  constructor(public payload: string) {}
}

export class SelectWorld implements Action {
  readonly type = WorldActionTypes.SelectWorld;

  constructor(public payload: string) {}
}

export type WorldActions =
  Load |
  Loadsuccess |
  LoadFail |
  SelectWorld;
