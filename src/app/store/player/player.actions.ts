import { Injectable } from '@angular/core';

@Injectable()
export class PlayerActions {
  public static UPDATE = '[Player] UPDATE';
  public static SET_PROGRESS = '[Player] SET_PROGRESS';
  public static SET_SIDENAV = '[Player] SET_SIDENAV';
  public static UPDATE_REPORTS = '[Player] UPDATE_REPORTS';
  // public static LOGIN_SUCCESS: string = '[Player] LOGIN Success';
  // public static LOGIN_FAIL: string = '[Player] LOGIN Fail';
}
