import { Injectable } from '@angular/core';

@Injectable()
export class TownActions {
  public static UPDATE = '[Town] UPDATE';
  public static UPDATE_EVENT = '[Town] UPDATE_EVENT';
  public static SCHEDULE_UPDATE = '[Town] SCHEDULE_UPDATE';
  public static SET_PLAYER_TOWNS = '[Town] SET_PLAYER_TOWNS';
  public static SET_ACTIVE_TOWN = '[Town] SET_ACTIVE_TOWN';
  public static CHANGE_NAME = '[Town] CHANGE_NAME';
  public static UPGRADE_BUILDING = '[Town] UPGRADE_BUILDING';
  // public static LOGIN_SUCCESS: string = '[Town] LOGIN Success';
  // public static LOGIN_FAIL: string = '[Town] LOGIN Fail';
}
