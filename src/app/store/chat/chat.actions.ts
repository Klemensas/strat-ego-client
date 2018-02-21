import { Action } from "@ngrx/store";
import { AllianceMessage } from "../alliance/alliance.model";

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

  constructor(public payload: string) {}
}
export class PostMessageSuccess implements Action {
  readonly type = ChatActionTypes.PostMessageSuccess;

  constructor(public payload: AllianceMessage) {}
}
export class AddMessage implements Action {
  readonly type = ChatActionTypes.AddMessage;

  constructor(public payload: AllianceMessage) {}
}

export type ChatActions = Update |
  PostMessage |
  PostMessageSuccess |
  AddMessage;
