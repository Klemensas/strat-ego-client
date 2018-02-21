// TODO: consider refactoring out hardcoded values
export const ALLIANCE_PERMISSIONS: permissionNames[] = [
  'viewInvites',
  'editInvites',
  'manageForum',
  'editProfile',
  'viewManagement',
  'manageRoles',
  'manageAlliance',
];

export const PERMISSION_NAMES: { [name in permissionNames]: string } = {
  viewInvites: '<i class="fa fa-eye"></i><i class="fa fa-envelope-open-o"></i>',
  editInvites: '<i class="fa fa-edit"></i><i class="fa fa-envelope-open-o"></i>',
  manageForum: '<i class="fa fa-edit"></i><i class="fa fa-comments"></i>',
  viewManagement: '<i class="fa fa-eye"></i><i class="fa fa-id-card-o"></i>',
  manageRoles: '<i class="fa fa-edit"></i><i class="fa fa-id-badge"></i>',
  editProfile: '<i class="fa fa-edit"></i><i class="fa fa-id-card-o"></i>',
  manageAlliance: '<i class="fa fa-edit"></i><i class="fa fa-tasks"></i>',
};

export type permissionNames =
  'viewInvites' |
  'editInvites' |
  'manageForum' |
  'editProfile' |
  'viewManagement' |
  'manageRoles' |
  'manageAlliance';


export interface Profile {
  id?: number;
  name: string;
  createdAt?: string;
}

export interface AllianceMember extends Profile {
  AllianceRole: AllianceRole;
}

export interface AllianceBase {
  id: number;
  name: string;
}

export type AlliancePermissions = {
  [name in permissionNames]: boolean;
};

export interface AllianceRole {
  id: number;
  name: string;
  permissions: AlliancePermissions;
}

export interface AllianceForumCategory {
  id: number;
  name: string;
  description: string;
  Topics: AllianceForumTopic[];
}

export interface AllianceForumTopic {
  id: number;
  name: string;
  CreatorId: number;
  Creator: Profile;
  CategoryId: number;
  Category: AllianceForumCategory;
  Posts: AllianceForumPost[];
  createdAt: number;
}

export interface AllianceForumPost {
  id: number;
  body: string;
  TopicId: number;
  Topic: AllianceForumTopic;
  PosterId: number;
  Poster: Profile;
}

export interface AllianceMessage {
  id: number;
  text: string;
  PlayerId: number;
  Player: Profile;
  createdAt: number;
}

export type eventType = 'diplomacy' | 'membership' | 'forum' | 'roles' | 'invitation' | 'management';
export type eventStatus =
  'proposeAlliance' | 'cancelAlliance' | 'rejectAlliance' | 'startAlliance' | 'endAlliance' | 'proposeNap' | 'cancelNap' | 'rejectNap' | 'startNap' | 'endNap' | 'startWar' | 'endWar' |
  'join' | 'leave' | 'remove' |
  'update' |
  'update' | 'updateMember' |
  'create' | 'reject' | 'cancel' |
  'updateProfile' | 'create';

export interface AllianceEvent {
  id: number;
  type: eventType;
  status: eventStatus;
  createdAt: Date;
  OriginPlayerId?: number;
  TargetPlayerId?: number;
  OriginPlayer?: Profile;
  TargetPlayer?: Profile;
  OriginAllianceId?: number;
  TargetAllianceId?: number;
  OriginAlliance?: AllianceBase;
  TargetAlliance?: AllianceBase;
}

export type diplomacyType = 'alliance' | 'war' | 'nap';
export type diplomacyStatus = 'pending' | 'ongoing';

export interface AllianceDiplomacy {
  id: number;
  status: diplomacyStatus;
  type: diplomacyType;
  data?: {
    reason: string;
  };
  OriginAllianceId: number;
  OriginAlliance: AllianceBase;
  OriginPlayerId: number;
  OriginPlayer: Profile;
  TargetAllianceId: number;
  TargetAlliance: AllianceBase;
  TargetPlayerId: number;
  TargetPlayer: Profile;
  createdAt: number;
  updatedAt: number;
}

export interface Alliance extends AllianceBase {
  Roles: AllianceRole[];
  DefaultRoleId: number;
  DefaultRole: AllianceRole;
  MasterRoleId: number;
  MasterRole?: AllianceRole;
  Members: AllianceMember[];
  Invitations: Profile[];
  Forum: AllianceForumCategory[];
  Messages: AllianceMessage[];
  Events: AllianceEvent[];
  DiplomacyOrigin: AllianceDiplomacy[];
  DiplomacyTarget: AllianceDiplomacy[];
}

export interface AllianceRoleSocketPayload {
  created?: AllianceRole[];
  updated?: AllianceRole[];
  removed?: number[];
  updatedMember?: { id: number; role: AllianceRole }[];
}

export interface AllianceEventSocketMessage<T> {
  event: AllianceEvent;
  data: T;
}
