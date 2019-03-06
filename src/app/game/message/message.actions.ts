import { Action } from '@ngrx/store';
import { Thread, ActionError, Paged } from 'strat-ego-common';

export enum MessageActionTypes {
  Initialize = '[Message] Initialize',
  Load = '[Message] Load',
  LoadSuccess = '[Message] LoadSuccess',
  LoadFail = '[Message] LoadFail',
  Create = '[Message] Create',
  CreateSuccess = '[Message] CreateSuccess',
  CreateFail = '[Message] CreateFail',

  ThreadReceived = '[Message][Event] ThreadReceived',
}

export class Initialize implements Action {
  readonly type = MessageActionTypes.Initialize;

  constructor(public payload?: Paged<Thread>) {}
}
export class Load implements Action {
  readonly type = MessageActionTypes.Load;

  constructor(public payload?: number) {}
}
export class LoadSuccess implements Action {
  readonly type = MessageActionTypes.LoadSuccess;

  constructor(public payload: { Messages: number[], playerId: number }) {}
}
export class LoadFail implements Action {
  readonly type = MessageActionTypes.LoadFail;

  constructor(public payload: ActionError) {}
}
export class Create implements Action {
  readonly type = MessageActionTypes.Create;

  constructor(public payload?: number) {}
}
export class CreateSuccess implements Action {
  readonly type = MessageActionTypes.CreateSuccess;

  constructor(public payload: Thread) {}
}
export class CreateFail implements Action {
  readonly type = MessageActionTypes.CreateFail;

  constructor(public payload: ActionError) {}
}
export class ThreadReceived implements Action {
  readonly type = MessageActionTypes.ThreadReceived;

  constructor(public payload: Thread) {}
}


export type MessageActions =
  Initialize |
  Load |
  LoadSuccess |
  LoadFail |
  Create |
  CreateSuccess |
  CreateFail |
  ThreadReceived
;
