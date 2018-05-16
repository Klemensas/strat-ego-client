import { Action } from '@ngrx/store';
import { AllianceMessage, MessagePayload } from 'strat-ego-common';

export enum ChatActionTypes {
  Update = '[Chat] UPDATE',
  PostMessage = '[Chat] Post Message',
  PostMessageSuccess = '[Chat] Post Message Success',
  AddMessage = '[Chat] Add Message'
}

export class Update implements Action {
  readonly type = ChatActionTypes.Update;

  constructor(public payload: AllianceMessage[]) {}
}
export class PostMessage implements Action {
  readonly type = ChatActionTypes.PostMessage;

  constructor(public payload: MessagePayload) {}
}
export class PostMessageSuccess implements Action {
  readonly type = ChatActionTypes.PostMessageSuccess;

  constructor(public payload: { message: AllianceMessage, messageStamp: number }) {}
}
export class AddMessage implements Action {
  readonly type = ChatActionTypes.AddMessage;

  constructor(public payload: AllianceMessage) {}
}

export type ChatActions = Update |
  PostMessage |
  PostMessageSuccess |
  AddMessage;
