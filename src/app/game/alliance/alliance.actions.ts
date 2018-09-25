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
  ActionError,
  AllianceProfile,
  Player,
  Dict,
} from 'strat-ego-common';

// TODO: consider separatig alliance from player and require a separate query to fetch player alliance
// TODO: fail actions, handling failure, success, progress
export enum AllianceActionTypes {
  Initialize = '[Alliance] Initialize',
  SetData = '[Alliance] Set Data',
  Create = '[Alliance] Create',
  CreateSuccess = '[Alliance] Create Success',
  CreateFail = '[Alliance] Create Fail',
  Destroy = '[Alliance] Destroy',
  DestroySuccess = '[Alliance] Destroy Success',
  DestroyFail = '[Alliance] Destroy Fail',
  LeaveAlliance = '[Alliance] Leave Alliance',
  LeaveAllianceSuccess = '[Alliance] Leave Alliance Success',
  LeaveAllianceFail = '[Alliance] Leave Alliance Fail',

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
  CreateInviteFail = '[Alliance][Management] Create Invite Fail',
  CancelInvite = '[Alliance][Management] Cancel Invite',
  CancelInviteSuccess = '[Alliance][Management] Cancel Invite Success',
  CancelInviteFail = '[Alliance][Management] Cancel Invite Fail',
  AcceptInvite = '[Alliance][Management] Accept Invite',
  AcceptInviteSuccess = '[Alliance][Management] Accept Invite Success',
  AcceptInviteFail = '[Alliance][Management] Accept Invite Fail',
  RejectInvite = '[Alliance][Management] Reject Invite',
  RejectInviteSuccess = '[Alliance][Management] Reject Invite Success',
  RejectInviteFail = '[Alliance][Management] Reject Invite Fail',
  UpdateRolePermissions = '[Alliance][Management] Update Role Permissions',
  UpdateRolePermissionsSuccess = '[Alliance][Management] Update Role Permissions Success',
  UpdateRolePermissionsFail = '[Alliance][Management] Update Role Permissions Fail',
  UpdateMemberRole = '[Alliance][Management] Update Member Role',
  UpdateMemberRoleSuccess = '[Alliance][Management] Update Member Role Success',
  UpdateMemberRoleFail = '[Alliance][Management] Update Member Role Fail',
  RemoveRole = '[Alliance][Management] Remove Role',
  RemoveRoleSuccess = '[Alliance][Management] Remove Role Success',
  RemoveRoleFail = '[Alliance][Management] Remove Role Fail',
  RemoveMember = '[Alliance][Management] Remove Member',
  RemoveMemberSuccess = '[Alliance][Management] Remove Member Success',
  RemoveMemberFail = '[Alliance][Management] Remove Member Fail',
  // Diplomacy
  ProposeAlliance = '[Alliance][Management] Propose Alliance',
  ProposeAllianceSuccess = '[Alliance][Management] Propose Alliance Success',
  ProposeAllianceFail = '[Alliance][Management] Propose Alliance Fail',
  RejectAlliance = '[Alliance][Management] Reject Alliance',
  RejectAllianceSuccess = '[Alliance][Management] Reject Alliance Success',
  RejectAllianceFail = '[Alliance][Management] Reject Alliance Fail',
  CancelAlliance = '[Alliance][Management] Cancel Alliance',
  CancelAllianceSuccess = '[Alliance][Management] Cancel Alliance Success',
  CancelAllianceFail = '[Alliance][Management] Cancel Alliance Fail',
  AcceptAlliance = '[Alliance][Management] Accept Alliance',
  AcceptAllianceSuccess = '[Alliance][Management] Accept Alliance Success',
  AcceptAllianceFail = '[Alliance][Management] Accept Alliance Fail',
  EndAlliance = '[Alliance][Management] End Alliance',
  EndAllianceSuccess = '[Alliance][Management] End Alliance Success',
  EndAllianceFail = '[Alliance][Management] End Alliance Fail',
  ProposeNap = '[Alliance][Management] Propose Nap',
  ProposeNapSuccess = '[Alliance][Management] Propose Nap Success',
  ProposeNapFail = '[Alliance][Management] Propose Nap Fail',
  RejectNap = '[Alliance][Management] Reject Nap',
  RejectNapSuccess = '[Alliance][Management] Reject Nap Success',
  RejectNapFail = '[Alliance][Management] Reject Nap Fail',
  CancelNap = '[Alliance][Management] Cancel Nap',
  CancelNapSuccess = '[Alliance][Management] Cancel Nap Success',
  CancelNapFail = '[Alliance][Management] Cancel Nap Fail',
  AcceptNap = '[Alliance][Management] Accept Nap',
  AcceptNapSuccess = '[Alliance][Management] Accept Nap Success',
  AcceptNapFail = '[Alliance][Management] Accept Nap Fail',
  EndNap = '[Alliance][Management] End Nap',
  EndNapSuccess = '[Alliance][Management] End Nap Success',
  EndNapFail = '[Alliance][Management] End Nap Fail',
  DeclareWar = '[Alliance][Management] Declare War',
  DeclareWarSuccess = '[Alliance][Management] Declare War Success',
  DeclareWarFail = '[Alliance][Management] Declare War Fail',

  ViewProfile = '[Alliance] View Profile',
  UpdateProfile = '[Alliance][Management] Update Profile',
  UpdateProfileSuccess = '[Alliance][Management] Update Profile Success',
  UpdateProfileFail = '[Alliance][Management] Update Profile Fail',
  RemoveAvatar = '[Alliance][Management] Remove Avatar',
  RemoveAvatarSuccess = '[Alliance][Management] Remove Avatar Success',
  RemoveAvatarFail = '[Alliance][Management] Remove Avatar Fail',

  LoadProfiles = '[Alliance] Load Profiles',
  LoadProfilesSuccess = '[Alliance] Load Profiles Success',
  LoadProfilesFail = '[Alliance] Load Profiles Fail',

  // Non self generated actions
  Invited = '[Alliance][Affected] Invited',
  InviteCanceled = '[Alliance][Affected] Invite Canceled',
  Removed = '[Alliance][Affected] Removed',
  UpdateSelfRole = '[Alliance][Affected] Update Self Role',

  // Update = '[Alliance] Update',
  // CreateForumCategory = '[Alliance] Create Forumc Category',
  // CreateForumCategorySuccess = '[Alliance] Create Forum Category Success',
}

export const AllianceSuccessActions = [
  AllianceActionTypes.CreateSuccess,
  AllianceActionTypes.CreateInviteSuccess,
  AllianceActionTypes.CancelInviteSuccess,
  AllianceActionTypes.AcceptInviteSuccess,
  AllianceActionTypes.RejectInviteSuccess,
  AllianceActionTypes.UpdateRolePermissionsSuccess,
  AllianceActionTypes.UpdateMemberRoleSuccess,
  AllianceActionTypes.RemoveRoleSuccess,
  AllianceActionTypes.RemoveMemberSuccess,
  AllianceActionTypes.ProposeAllianceSuccess,
  AllianceActionTypes.RejectAllianceSuccess,
  AllianceActionTypes.CancelAllianceSuccess,
  AllianceActionTypes.AcceptAllianceSuccess,
  AllianceActionTypes.EndAllianceSuccess,
  AllianceActionTypes.ProposeNapSuccess,
  AllianceActionTypes.RejectNapSuccess,
  AllianceActionTypes.CancelNapSuccess,
  AllianceActionTypes.AcceptNapSuccess,
  AllianceActionTypes.EndNapSuccess,
  AllianceActionTypes.DeclareWarSuccess,
  AllianceActionTypes.UpdateProfileSuccess,
  AllianceActionTypes.RemoveAvatarSuccess,
];
export const AllianceFailActions = [
  AllianceActionTypes.CreateFail,
  AllianceActionTypes.CreateInviteFail,
  AllianceActionTypes.CancelInviteFail,
  AllianceActionTypes.RemoveMemberFail,
  AllianceActionTypes.UpdateRolePermissionsFail,
  AllianceActionTypes.RemoveRoleFail,
  AllianceActionTypes.UpdateMemberRoleFail,
  AllianceActionTypes.AcceptInviteFail,
  AllianceActionTypes.RejectInviteFail,
  AllianceActionTypes.LeaveAllianceFail,
  AllianceActionTypes.DestroyFail,
  AllianceActionTypes.ProposeAllianceFail,
  AllianceActionTypes.ProposeNapFail,
  AllianceActionTypes.CancelAllianceFail,
  AllianceActionTypes.CancelNapFail,
  AllianceActionTypes.RejectAllianceFail,
  AllianceActionTypes.RejectNapFail,
  AllianceActionTypes.AcceptAllianceFail,
  AllianceActionTypes.AcceptNapFail,
  AllianceActionTypes.EndAllianceFail,
  AllianceActionTypes.EndNapFail,
  AllianceActionTypes.DeclareWarFail,
  AllianceActionTypes.UpdateProfileFail,
  AllianceActionTypes.RemoveAvatarFail,
];

export class Initialize implements Action {
  readonly type = AllianceActionTypes.Initialize;

  constructor(public payload: { alliance: Alliance, player: Player }) {}
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
export class CreateFail implements Action {
  readonly type = AllianceActionTypes.CreateFail;

  constructor(public payload: ActionError) {}
}
export class Destroy implements Action {
  readonly type = AllianceActionTypes.Destroy;
}
export class DestroySuccess implements Action {
  readonly type = AllianceActionTypes.DestroySuccess;
}
export class DestroyFail implements Action {
  readonly type = AllianceActionTypes.DestroyFail;

  constructor(public payload: ActionError) {}
}
export class LeaveAlliance implements Action {
  readonly type = AllianceActionTypes.LeaveAlliance;
}
export class LeaveAllianceSuccess implements Action {
  readonly type = AllianceActionTypes.LeaveAllianceSuccess;
}
export class LeaveAllianceFail implements Action {
  readonly type = AllianceActionTypes.LeaveAllianceFail;

  constructor(public payload: ActionError) {}
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
export class CreateInviteFail implements Action {
  readonly type = AllianceActionTypes.CreateInviteFail;

  constructor(public payload: ActionError) {}
}
export class CancelInvite implements Action {
  readonly type = AllianceActionTypes.CancelInvite;

  constructor(public payload: number) {}
}
export class CancelInviteSuccess implements Action {
  readonly type = AllianceActionTypes.CancelInviteSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class CancelInviteFail implements Action {
  readonly type = AllianceActionTypes.CancelInviteFail;

  constructor(public payload: ActionError) {}
}
export class AcceptInvite implements Action {
  readonly type = AllianceActionTypes.AcceptInvite;

  constructor(public payload: number) {}
}
export class AcceptInviteSuccess implements Action {
  readonly type = AllianceActionTypes.AcceptInviteSuccess;

  constructor(public payload: Alliance) {}
}
export class AcceptInviteFail implements Action {
  readonly type = AllianceActionTypes.AcceptInviteFail;

  constructor(public payload: ActionError) {}
}
export class RejectInvite implements Action {
  readonly type = AllianceActionTypes.RejectInvite;

  constructor(public payload: number) {}
}
export class RejectInviteSuccess implements Action {
  readonly type = AllianceActionTypes.RejectInviteSuccess;

  constructor(public payload: number) {}
}
export class RejectInviteFail implements Action {
  readonly type = AllianceActionTypes.RejectInviteFail;

  constructor(public payload: ActionError) {}
}
export class UpdateRolePermissions implements Action {
  readonly type = AllianceActionTypes.UpdateRolePermissions;

  constructor(public payload: { roles: AllianceRole[]; newRoles: AllianceRole[] }) {}
}
export class UpdateRolePermissionsSuccess implements Action {
  readonly type = AllianceActionTypes.UpdateRolePermissionsSuccess;

  constructor(public payload: AllianceEventSocketMessage<AllianceRoleSocketPayload>) {}
}
export class UpdateRolePermissionsFail implements Action {
  readonly type = AllianceActionTypes.UpdateRolePermissionsFail;

  constructor(public payload: ActionError) {}
}
export class UpdateMemberRole implements Action {
  readonly type = AllianceActionTypes.UpdateMemberRole;

  constructor(public payload: { playerId: number; roleId: number }) {}
}
export class UpdateMemberRoleSuccess implements Action {
  readonly type = AllianceActionTypes.UpdateMemberRoleSuccess;

  constructor(public payload: AllianceEventSocketMessage<AllianceRoleSocketPayload>) {}
}
export class UpdateMemberRoleFail implements Action {
  readonly type = AllianceActionTypes.UpdateMemberRoleFail;

  constructor(public payload: ActionError) {}
}
export class RemoveRole implements Action {
  readonly type = AllianceActionTypes.RemoveRole;

  constructor(public payload: number) {}
}
export class RemoveRoleSuccess implements Action {
  readonly type = AllianceActionTypes.RemoveRoleSuccess;

  constructor(public payload: AllianceEventSocketMessage<AllianceRoleSocketPayload>) {}
}
export class RemoveRoleFail implements Action {
  readonly type = AllianceActionTypes.RemoveRoleFail;

  constructor(public payload: ActionError) {}
}
export class RemoveMember implements Action {
  readonly type = AllianceActionTypes.RemoveMember;

  constructor(public payload: number) {}
}
export class RemoveMemberSuccess implements Action {
  readonly type = AllianceActionTypes.RemoveMemberSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class RemoveMemberFail implements Action {
  readonly type = AllianceActionTypes.RemoveMemberFail;

  constructor(public payload: ActionError) {}
}
export class LoadProfiles implements Action {
  readonly type = AllianceActionTypes.LoadProfiles;

  constructor(public payload: number[]) {}
}
export class LoadProfilesSuccess implements Action {
  readonly type = AllianceActionTypes.LoadProfilesSuccess;

  constructor(public payload: Dict<AllianceProfile>) {}
}
export class LoadProfilesFail implements Action {
  readonly type = AllianceActionTypes.LoadProfilesFail;

  constructor(public payload: ActionError) {}
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
export class ProposeAllianceFail implements Action {
  readonly type = AllianceActionTypes.ProposeAllianceFail;

  constructor(public payload: ActionError) {}
}
export class RejectAlliance implements Action {
  readonly type = AllianceActionTypes.RejectAlliance;

  constructor(public payload: number) {}
}
export class RejectAllianceSuccess implements Action {
  readonly type = AllianceActionTypes.RejectAllianceSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class RejectAllianceFail implements Action {
  readonly type = AllianceActionTypes.RejectAllianceFail;

  constructor(public payload: ActionError) {}
}
export class AcceptAlliance implements Action {
  readonly type = AllianceActionTypes.AcceptAlliance;

  constructor(public payload: number) {}
}
export class AcceptAllianceSuccess implements Action {
  readonly type = AllianceActionTypes.AcceptAllianceSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class AcceptAllianceFail implements Action {
  readonly type = AllianceActionTypes.AcceptAllianceFail;

  constructor(public payload: ActionError) {}
}
export class EndAlliance implements Action {
  readonly type = AllianceActionTypes.EndAlliance;

  constructor(public payload: number) {}
}
export class EndAllianceSuccess implements Action {
  readonly type = AllianceActionTypes.EndAllianceSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class EndAllianceFail implements Action {
  readonly type = AllianceActionTypes.EndAllianceFail;

  constructor(public payload: ActionError) {}
}
export class CancelAlliance implements Action {
  readonly type = AllianceActionTypes.CancelAlliance;

  constructor(public payload: number) {}
}
export class CancelAllianceSuccess implements Action {
  readonly type = AllianceActionTypes.CancelAllianceSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class CancelAllianceFail implements Action {
  readonly type = AllianceActionTypes.CancelAllianceFail;

  constructor(public payload: ActionError) {}
}
export class ProposeNap implements Action {
  readonly type = AllianceActionTypes.ProposeNap;

  constructor(public payload: string) {}
}
export class ProposeNapSuccess implements Action {
  readonly type = AllianceActionTypes.ProposeNapSuccess;

  constructor(public payload: AllianceEventSocketMessage<AllianceDiplomacy>) {}
}
export class ProposeNapFail implements Action {
  readonly type = AllianceActionTypes.ProposeNapFail;

  constructor(public payload: ActionError) {}
}
export class RejectNap implements Action {
  readonly type = AllianceActionTypes.RejectNap;

  constructor(public payload: number) {}
}
export class RejectNapSuccess implements Action {
  readonly type = AllianceActionTypes.RejectNapSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class RejectNapFail implements Action {
  readonly type = AllianceActionTypes.RejectNapFail;

  constructor(public payload: ActionError) {}
}
export class CancelNap implements Action {
  readonly type = AllianceActionTypes.CancelNap;

  constructor(public payload: number) {}
}
export class CancelNapSuccess implements Action {
  readonly type = AllianceActionTypes.CancelNapSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class CancelNapFail implements Action {
  readonly type = AllianceActionTypes.CancelNapFail;

  constructor(public payload: ActionError) {}
}
export class AcceptNap implements Action {
  readonly type = AllianceActionTypes.AcceptNap;

  constructor(public payload: number) {}
}
export class AcceptNapSuccess implements Action {
  readonly type = AllianceActionTypes.AcceptNapSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class AcceptNapFail implements Action {
  readonly type = AllianceActionTypes.AcceptNapFail;

  constructor(public payload: ActionError) {}
}
export class EndNap implements Action {
  readonly type = AllianceActionTypes.EndNap;

  constructor(public payload: number) {}
}
export class EndNapSuccess implements Action {
  readonly type = AllianceActionTypes.EndNapSuccess;

  constructor(public payload: AllianceEventSocketMessage<number>) {}
}
export class EndNapFail implements Action {
  readonly type = AllianceActionTypes.EndNapFail;

  constructor(public payload: ActionError) {}
}
export class DeclareWar implements Action {
  readonly type = AllianceActionTypes.DeclareWar;

  constructor(public payload: { targetName: string; reason: string; }) {}
}
export class DeclareWarSuccess implements Action {
  readonly type = AllianceActionTypes.DeclareWarSuccess;

  constructor(public payload: AllianceEventSocketMessage<AllianceDiplomacy>) {}
}
export class DeclareWarFail implements Action {
  readonly type = AllianceActionTypes.DeclareWarFail;

  constructor(public payload: ActionError) {}
}
export class ViewProfile implements Action {
  readonly type = AllianceActionTypes.ViewProfile;

  constructor(public payload: number) {}
}
export class UpdateProfile implements Action {
  readonly type = AllianceActionTypes.UpdateProfile;

  constructor(public payload: ProfileUpdate) {}
}
export class UpdateProfileSuccess implements Action {
  readonly type = AllianceActionTypes.UpdateProfileSuccess;

  constructor(public payload: AllianceEventSocketMessage<ProfileUpdate>) {}
}
export class UpdateProfileFail implements Action {
  readonly type = AllianceActionTypes.UpdateProfileFail;

  constructor(public payload: ActionError) {}
}
export class RemoveAvatar implements Action {
  readonly type = AllianceActionTypes.RemoveAvatar;
}
export class RemoveAvatarSuccess implements Action {
  readonly type = AllianceActionTypes.RemoveAvatarSuccess;

  constructor(public payload: AllianceEventSocketMessage<ProfileUpdate>) {}
}
export class RemoveAvatarFail implements Action {
  readonly type = AllianceActionTypes.RemoveAvatarFail;

  constructor(public payload: ActionError) {}
}

export type AllianceActions = Initialize
  | SetData
  | Create
  | CreateSuccess
  | CreateFail
  | Destroy
  | DestroySuccess
  | DestroyFail
  | LeaveAlliance
  | LeaveAllianceSuccess
  | LeaveAllianceFail
  | EventInvitation
  | EventMembership
  | EventRoles
  | EventDiplomacy
  | EventProfile
  | CreateInvite
  | CreateInviteSuccess
  | CreateInviteFail
  | CancelInvite
  | CancelInviteSuccess
  | CancelInviteFail
  | AcceptInvite
  | AcceptInviteSuccess
  | AcceptInviteFail
  | RejectInvite
  | RejectInviteSuccess
  | RejectInviteFail
  | UpdateRolePermissions
  | UpdateRolePermissionsSuccess
  | UpdateRolePermissionsFail
  | UpdateMemberRole
  | UpdateMemberRoleSuccess
  | UpdateMemberRoleFail
  | RemoveRole
  | RemoveRoleSuccess
  | RemoveRoleFail
  | RemoveMember
  | RemoveMemberSuccess
  | RemoveMemberFail
  | LoadProfiles
  | LoadProfilesSuccess
  | LoadProfilesFail
  | Invited
  | InviteCanceled
  | Removed
  | UpdateSelfRole
  | ProposeAlliance
  | ProposeAllianceSuccess
  | ProposeAllianceFail
  | RejectAlliance
  | RejectAllianceSuccess
  | RejectAllianceFail
  | CancelAlliance
  | CancelAllianceSuccess
  | CancelAllianceFail
  | AcceptAlliance
  | AcceptAllianceSuccess
  | AcceptAllianceFail
  | EndAlliance
  | EndAllianceSuccess
  | EndAllianceFail
  | ProposeNap
  | ProposeNapSuccess
  | ProposeNapFail
  | RejectNap
  | RejectNapSuccess
  | RejectNapFail
  | CancelNap
  | CancelNapSuccess
  | CancelNapFail
  | AcceptNap
  | AcceptNapSuccess
  | AcceptNapFail
  | EndNap
  | EndNapSuccess
  | EndNapFail
  | DeclareWar
  | DeclareWarSuccess
  | DeclareWarFail
  | ViewProfile
  | UpdateProfile
  | UpdateProfileSuccess
  | UpdateProfileFail
  | RemoveAvatar
  | RemoveAvatarSuccess
  | RemoveAvatarFail
;

export type AllianceEventActionTypes = EventInvitation
  | EventMembership
  | EventRoles
  | EventDiplomacy
  | EventProfile
;

// TODO: use actual constructors here
export const AllianceEventActions = [
  'EventDiplomacy',
  'EventInvitation',
  'EventMembership',
  'EventRoles',
  'EventManagement',
  'EventProfile',
];
