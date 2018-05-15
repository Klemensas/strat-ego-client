import { Action } from '@ngrx/store';
import {
  Alliance,
  AllianceRole,
  Profile,
  AllianceDiplomacy,
  AllianceEventSocketMessage,
  AllianceMember,
  AllianceRoleSocketPayload,
  ProfileUpdate,
} from 'strat-ego-common';

// TODO: consider separatig alliance from player and require a separate query to fetch player alliance
// TODO: fail actions, handling failure, success, progress
export enum AllianceActionTypes {
  SetData = '[Alliance] Set Data',
  Create = '[Alliance] Create',
  CreateSuccess = '[Alliance] Create Success',
  Destroy = '[Alliance] Destroy',
  DestroySuccess = '[Alliance] Destroy Success',
  LeaveAlliance = '[Alliance] Leave Alliance',
  LeaveAllianceSuccess = '[Alliance] Leave Alliance Success',

  // Alliance specific events
  EventInvitation = '[Alliance][Event] Invitation',
  EventMembership = '[Alliance][Event] Membership',
  // EventManagement = '[Alliance][Event] Management',
  EventRoles = '[Alliance][Event] Roles',
  EventDiplomacy = '[Alliance][Event] Diplomacy',
  EventProfile = '[Alliance][Event] Profile',

  // Alliance management
  CreateInvite = '[Alliance][Management] Create Invite',
  CreateInviteSuccess = '[Alliance][Management] Create Invite Success',
  CancelInvite = '[Alliance][Management] Cancel Invite',
  CancelInviteSuccess = '[Alliance][Management] Cancel Invite Success',
  AcceptInvite = '[Alliance][Management] Accept Invite',
  AcceptInviteSuccess = '[Alliance][Management] Accept Invite Success',
  RejectInvite = '[Alliance][Management] Reject Invite',
  RejectInviteSuccess = '[Alliance][Management] Reject Invite Success',
  UpdateRolePermissions = '[Alliance][Management] Update Role Permissions',
  UpdateRolePermissionsSuccess = '[Alliance][Management] Update Role Permissions Success',
  UpdateMemberRole = '[Alliance][Management] Update Member Role',
  UpdateMemberRoleSuccess = '[Alliance][Management] Update Member Role Success',
  RemoveRole = '[Alliance][Management] Remove Role',
  RemoveRoleSuccess = '[Alliance][Management] Remove Role Success',
  RemoveMember = '[Alliance][Management] Remove Member',
  RemoveMemberSuccess = '[Alliance][Management] Remove Member Success',
  // Diplomacy
  ProposeAlliance = '[Alliance][Management] Propose Alliance',
  ProposeAllianceSuccess = '[Alliance][Management] Propose Alliance Success',
  RejectAlliance = '[Alliance][Management] Reject Alliance',
  RejectAllianceSuccess = '[Alliance][Management] Reject Alliance Success',
  CancelAlliance = '[Alliance][Management] Cancel Alliance',
  CancelAllianceSuccess = '[Alliance][Management] Cancel Alliance Success',
  AcceptAlliance = '[Alliance][Management] Accept Alliance',
  AcceptAllianceSuccess = '[Alliance][Management] Accept Alliance Success',
  EndAlliance = '[Alliance][Management] End Alliance',
  EndAllianceSuccess = '[Alliance][Management] End Alliance Success',
  ProposeNap = '[Alliance][Management] Propose Nap',
  ProposeNapSuccess = '[Alliance][Management] Propose Nap Success',
  RejectNap = '[Alliance][Management] Reject Nap',
  RejectNapSuccess = '[Alliance][Management] Reject Nap Success',
  CancelNap = '[Alliance][Management] Cancel Nap',
  CancelNapSuccess = '[Alliance][Management] Cancel Nap Success',
  AcceptNap = '[Alliance][Management] Accept Nap',
  AcceptNapSuccess = '[Alliance][Management] Accept Nap Success',
  EndNap = '[Alliance][Management] End Nap',
  EndNapSuccess = '[Alliance][Management] End Nap Success',
  DeclareWar = '[Alliance][Management] Declare War',
  DeclareWarSuccess = '[Alliance][Management] Declare War Success',

  ViewProfile = '[Alliance] View Profile',
  LoadProfile = '[Alliance] Load Profile',
  LoadProfileSuccess = '[Alliance] Load Profile Success',
  UpdateProfile = '[Alliance][Management] Update Profile',
  UpdateProfileSuccess = '[Alliance][Management] Update Profile Success',
  RemoveAvatar = '[Alliance][Management] Remove Avatar',
  RemoveAvatarSuccess = '[Alliance][Management] Remove Avatar Success',

  // Non self generated actions
  Invited = '[Alliance][Affected] Invited',
  InviteCanceled = '[Alliance][Affected] Invite Canceled',
  Removed = '[Alliance][Affected] Removed',
  UpdateSelfRole = '[Alliance][Affected] Update Self Role',

  // Update = '[Alliance] Update',
  // CreateForumCategory = '[Alliance] Create Forumc Category',
  // CreateForumCategorySuccess = '[Alliance] Create Forum Category Success',
}

export class SetData implements Action {
  readonly type = AllianceActionTypes.SetData;

  constructor(public payload: { allianceId: number; alliance: Partial<Alliance>; allianceRole: AllianceRole; invitations: Profile[] }) {}
}
export class Create implements Action {
  readonly type = AllianceActionTypes.Create;

  constructor(public payload: string) {}
}
export class CreateSuccess implements Action {
  readonly type = AllianceActionTypes.CreateSuccess;

  constructor(public payload: Alliance) {}
}
export class Destroy implements Action {
  readonly type = AllianceActionTypes.Destroy;
}
export class DestroySuccess implements Action {
  readonly type = AllianceActionTypes.DestroySuccess;
}
export class LeaveAlliance implements Action {
  readonly type = AllianceActionTypes.LeaveAlliance;
}
export class LeaveAllianceSuccess implements Action {
  readonly type = AllianceActionTypes.LeaveAllianceSuccess;
}
export class EventInvitation implements Action {
  readonly type = AllianceActionTypes.EventInvitation;

  constructor(public payload: AllianceEventSocketMessage<Profile | number>) {}
}
export class EventMembership implements Action {
  readonly type = AllianceActionTypes.EventMembership;

  constructor(public payload: AllianceEventSocketMessage<AllianceMember | number>) {}
}
export class EventRoles implements Action {
  readonly type = AllianceActionTypes.EventRoles;

  constructor(public payload: AllianceEventSocketMessage<AllianceRoleSocketPayload>) {}
}
export class EventDiplomacy implements Action {
  readonly type = AllianceActionTypes.EventDiplomacy;

  constructor(public payload: AllianceEventSocketMessage<AllianceDiplomacy | number>) {}
}
export class EventProfile implements Action {
  readonly type = AllianceActionTypes.EventProfile;

  constructor(public payload: AllianceEventSocketMessage<ProfileUpdate>) {}
}
export class CreateInvite implements Action {
  readonly type = AllianceActionTypes.CreateInvite;

  constructor(public payload: string) {}
}
export class CreateInviteSuccess implements Action {
  readonly type = AllianceActionTypes.CreateInviteSuccess;

  constructor(public payload: AllianceEventSocketMessage<Profile>) {}
}
export class CancelInvite implements Action {
  readonly type = AllianceActionTypes.CancelInvite;

  constructor(public payload: number) {}
}
export class CancelInviteSuccess implements Action {
  readonly type = AllianceActionTypes.CancelInviteSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class AcceptInvite implements Action {
  readonly type = AllianceActionTypes.AcceptInvite;

  constructor(public payload: number) {}
}
export class AcceptInviteSuccess implements Action {
  readonly type = AllianceActionTypes.AcceptInviteSuccess;

  constructor(public payload: Alliance) {}
}
export class RejectInvite implements Action {
  readonly type = AllianceActionTypes.RejectInvite;

  constructor(public payload: number) {}
}
export class RejectInviteSuccess implements Action {
  readonly type = AllianceActionTypes.RejectInviteSuccess;

  constructor(public payload: number) {}
}
export class UpdateRolePermissions implements Action {
  readonly type = AllianceActionTypes.UpdateRolePermissions;

  constructor(public payload: { roles: AllianceRole[]; newRoles: AllianceRole[] }) {}
}
export class UpdateRolePermissionsSuccess implements Action {
  readonly type = AllianceActionTypes.UpdateRolePermissionsSuccess;

  constructor(public payload: AllianceEventSocketMessage<AllianceRoleSocketPayload>) {}
}
export class UpdateMemberRole implements Action {
  readonly type = AllianceActionTypes.UpdateMemberRole;

  constructor(public payload: { playerId: number; roleId: number }) {}
}
export class UpdateMemberRoleSuccess implements Action {
  readonly type = AllianceActionTypes.UpdateMemberRoleSuccess;

  constructor(public payload: AllianceEventSocketMessage<AllianceRoleSocketPayload>) {}
}
export class RemoveRole implements Action {
  readonly type = AllianceActionTypes.RemoveRole;

  constructor(public payload: number) {}
}
export class RemoveRoleSuccess implements Action {
  readonly type = AllianceActionTypes.RemoveRoleSuccess;

  constructor(public payload: AllianceEventSocketMessage<AllianceRoleSocketPayload>) {}
}
export class RemoveMember implements Action {
  readonly type = AllianceActionTypes.RemoveMember;

  constructor(public payload: number) {}
}
export class RemoveMemberSuccess implements Action {
  readonly type = AllianceActionTypes.RemoveMemberSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class Invited implements Action {
  readonly type = AllianceActionTypes.Invited;

  constructor(public payload: Profile) {}
}
export class InviteCanceled implements Action {
  readonly type = AllianceActionTypes.InviteCanceled;

  constructor(public payload: number) {}
}
export class Removed implements Action {
  readonly type = AllianceActionTypes.Removed;
}
export class UpdateSelfRole implements Action {
  readonly type = AllianceActionTypes.UpdateSelfRole;

  constructor(public payload: AllianceRole) {}
}
export class ProposeAlliance implements Action {
  readonly type = AllianceActionTypes.ProposeAlliance;

  constructor(public payload: string) {}
}
export class ProposeAllianceSuccess implements Action {
  readonly type = AllianceActionTypes.ProposeAllianceSuccess;

  constructor(public payload: AllianceEventSocketMessage<AllianceDiplomacy>) {}
}
export class RejectAlliance implements Action {
  readonly type = AllianceActionTypes.RejectAlliance;

  constructor(public payload: number) {}
}
export class RejectAllianceSuccess implements Action {
  readonly type = AllianceActionTypes.RejectAllianceSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class AcceptAlliance implements Action {
  readonly type = AllianceActionTypes.AcceptAlliance;

  constructor(public payload: number) {}
}
export class AcceptAllianceSuccess implements Action {
  readonly type = AllianceActionTypes.AcceptAllianceSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class EndAlliance implements Action {
  readonly type = AllianceActionTypes.EndAlliance;

  constructor(public payload: number) {}
}
export class EndAllianceSuccess implements Action {
  readonly type = AllianceActionTypes.EndAllianceSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class CancelAlliance implements Action {
  readonly type = AllianceActionTypes.CancelAlliance;

  constructor(public payload: number) {}
}
export class CancelAllianceSuccess implements Action {
  readonly type = AllianceActionTypes.CancelAllianceSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class ProposeNap implements Action {
  readonly type = AllianceActionTypes.ProposeNap;

  constructor(public payload: string) {}
}
export class ProposeNapSuccess implements Action {
  readonly type = AllianceActionTypes.ProposeNapSuccess;

  constructor(public payload: AllianceEventSocketMessage<AllianceDiplomacy>) {}
}
export class RejectNap implements Action {
  readonly type = AllianceActionTypes.RejectNap;

  constructor(public payload: number) {}
}
export class RejectNapSuccess implements Action {
  readonly type = AllianceActionTypes.RejectNapSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class CancelNap implements Action {
  readonly type = AllianceActionTypes.CancelNap;

  constructor(public payload: number) {}
}
export class CancelNapSuccess implements Action {
  readonly type = AllianceActionTypes.CancelNapSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class AcceptNap implements Action {
  readonly type = AllianceActionTypes.AcceptNap;

  constructor(public payload: number) {}
}
export class AcceptNapSuccess implements Action {
  readonly type = AllianceActionTypes.AcceptNapSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class EndNap implements Action {
  readonly type = AllianceActionTypes.EndNap;

  constructor(public payload: number) {}
}
export class EndNapSuccess implements Action {
  readonly type = AllianceActionTypes.EndNapSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class DeclareWar implements Action {
  readonly type = AllianceActionTypes.DeclareWar;

  constructor(public payload: { targetName: string; reason: string; }) {}
}
export class DeclareWarSuccess implements Action {
  readonly type = AllianceActionTypes.DeclareWarSuccess;

  constructor(public payload: AllianceEventSocketMessage<AllianceDiplomacy>) {}
}
export class ViewProfile implements Action {
  readonly type = AllianceActionTypes.ViewProfile;

  constructor(public payload: number) {}
}
export class LoadProfile implements Action {
  readonly type = AllianceActionTypes.LoadProfile;

  constructor(public payload: number) {}
}
export class LoadProfileSuccess implements Action {
  readonly type = AllianceActionTypes.LoadProfileSuccess;

  constructor(public payload: Partial<Alliance>) {}
}
export class UpdateProfile implements Action {
  readonly type = AllianceActionTypes.UpdateProfile;

  constructor(public payload: ProfileUpdate) {}
}
export class UpdateProfileSuccess implements Action {
  readonly type = AllianceActionTypes.UpdateProfileSuccess;

  constructor(public payload: AllianceEventSocketMessage<ProfileUpdate>) {}
}
export class RemoveAvatar implements Action {
  readonly type = AllianceActionTypes.RemoveAvatar;
}
export class RemoveAvatarSuccess implements Action {
  readonly type = AllianceActionTypes.RemoveAvatarSuccess;

  constructor(public payload: AllianceEventSocketMessage<ProfileUpdate>) {}
}

export type AllianceActions = SetData |
  Create |
  CreateSuccess |
  Destroy |
  DestroySuccess |
  LeaveAlliance |
  LeaveAllianceSuccess |
  EventInvitation |
  EventMembership |
  EventRoles |
  EventDiplomacy |
  EventProfile |
  CreateInvite |
  CreateInviteSuccess |
  CancelInvite |
  CancelInviteSuccess |
  AcceptInvite |
  AcceptInviteSuccess |
  RejectInvite |
  RejectInviteSuccess |
  UpdateRolePermissions |
  UpdateRolePermissionsSuccess |
  UpdateMemberRole |
  UpdateMemberRoleSuccess |
  RemoveRole |
  RemoveRoleSuccess |
  RemoveMember |
  RemoveMemberSuccess |
  Invited |
  InviteCanceled |
  Removed |
  UpdateSelfRole |
  ProposeAlliance |
  ProposeAllianceSuccess |
  RejectAlliance |
  RejectAllianceSuccess |
  CancelAlliance |
  CancelAllianceSuccess |
  AcceptAlliance |
  AcceptAllianceSuccess |
  EndAlliance |
  EndAllianceSuccess |
  ProposeNap |
  ProposeNapSuccess |
  RejectNap |
  RejectNapSuccess |
  CancelNap |
  CancelNapSuccess |
  AcceptNap |
  AcceptNapSuccess |
  EndNap |
  EndNapSuccess |
  DeclareWar |
  DeclareWarSuccess |
  ViewProfile |
  LoadProfile |
  LoadProfileSuccess |
  UpdateProfile |
  UpdateProfileSuccess |
  RemoveAvatar |
  RemoveAvatarSuccess;

export type AllianceEventActionTypes = EventInvitation |
  EventMembership |
  EventRoles |
  EventDiplomacy |
  EventProfile;

// TODO: use actual constructors here
export const AllianceEventActions = [
  'EventDiplomacy',
  'EventInvitation',
  'EventMembership',
  'EventRoles',
  'EventManagement',
  'EventProfile',
];
