import { Injectable } from '@angular/core';

@Injectable()
export class AllianceActions {
  public static SET_DATA = '[Alliance] SET_DATA';
  public static CREATE = '[Alliance] CREATE';
  public static CREATE_SUCCESS = '[Alliance] CREATE_SUCCESS';
  public static SEND_INVITE = '[Alliance] SEND_INVITE';
  public static INVITED = '[Alliance] INVITED';
  public static INVITE_CANCELED = '[Alliance] INVITE_CANCELED';
  public static INVITE_REJECTED = '[Alliance] INVITE_REJECTED';
  public static CANCEL_INVITE = '[Alliance] CANCEL_INVITE';
  public static ACCEPT_INVITE = '[Alliance] ACCEPT_INVITE';
  public static ACCEPT_INVITE_SUCCESS = '[Alliance] ACCEPT_INVITE_SUCCESS';
  public static REJECT_INVITE = '[Alliance] REJECT_INVITE';
  public static REJECT_INVITE_SUCCESS = '[Alliance] REJECT_INVITE_SUCCESS';
  public static UPDATE = '[Alliance] UPDATE';
  public static UPDATE_ROLE_PERMISSIONS = '[Alliance] UPDATE_ROLE_PERMISSIONS';
  public static UPDATE_MEMBER_ROLE = '[Alliance] UPDATE_MEMBER_ROLE';
  public static UPDATE_MEMBER = '[Alliance] UPDATE_MEMBER';
  public static REMOVED_MEMBER = '[Alliance] REMOVED_MEMBER';
  public static REMOVE_ROLE = '[Alliance] REMOVE_ROLE';
  public static REMOVE_PLAYER = '[Alliance] REMOVE_PLAYER';
  public static DESTROY = '[Alliance] DESTROY';
  public static DESTROY_SUCCESS = '[Alliance] DESTROY_SUCCESS';
  public static LEAVE_ALLIANCE = '[Alliance] LEAVE_ALLIANCE';
  public static LEAVE_ALLIANCE_SUCCESS = '[Alliance] LEAVE_ALLIANCE_SUCCESS';
  public static CREATE_FORUM_CATEGORY = '[Alliance] CREATE_FORUM_CATEGORY';
  public static CREATE_FORUM_CATEGORY_SUCCESS = '[Alliance] CREATE_FORUM_CATEGORY_SUCCESS';
}
