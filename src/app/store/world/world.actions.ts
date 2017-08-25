import { Injectable } from '@angular/core';

@Injectable()
export class WorldActions {
  public static LOAD = '[World] LOAD';
  public static LOAD_SUCCESS = '[World] LOAD Success';
  public static LOAD_FAIL = '[World] LOAD Fail';
  public static SELECT_WORLD = '[World] SELECT_WORLD';
}
