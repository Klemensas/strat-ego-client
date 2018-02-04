import { Injectable } from '@angular/core';

@Injectable()
export class ChatActions {
  public static UPDATE = '[Chat] UPDATE';
  public static POST_MESSAGE = '[Chat] POST_MESSAGE';
  public static POST_MESSAGE_SUCCESS = '[Chat] POST_MESSAGE_SUCCESS';
  public static ADD_MESSAGE = '[Chat] ADD_MESSAGE';
}
