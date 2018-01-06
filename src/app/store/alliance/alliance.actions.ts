import { Injectable } from '@angular/core';

@Injectable()
export class AllianceActions {
  public static SET_DATA = '[Alliance] SET_DATA';
  public static CREATE = '[Alliance] CREATE';
  public static SEND_INVITE = '[Alliance] SEND_INVITE';
  public static CANCEL_INVITE = '[Alliance] CANCEL_INVITE';
  public static ACCEPT_INVITE = '[Alliance] ACCEPT_INVITE';
  public static REJECT_INVITE = '[Alliance] REJECT_INVITE';
  public static UPDATE = '[Alliance] UPDATE';
  public static UPDATE_ROLE_PERMISSIONS = '[Alliance] UPDATE_ROLE_PERMISSIONS';
  // public static LOGIN_FAIL: string = '[Player] LOGIN Fail';
}
