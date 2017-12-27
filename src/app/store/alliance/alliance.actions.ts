import { Injectable } from '@angular/core';

@Injectable()
export class AllianceActions {
  public static SET_DATA = '[Alliance] SET_DATA';
  public static CREATE = '[Alliance] CREATE';
  public static SEND_INVITE = '[Alliance] SEND_INVITE';
  public static UPDATE_INVITES = '[Alliance] UPDATE_INVITES';
  // public static LOGIN_FAIL: string = '[Player] LOGIN Fail';
}
