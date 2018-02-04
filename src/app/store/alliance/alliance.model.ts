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

export interface Alliance extends AllianceBase {
  Roles: AllianceRole[];
  DefaultRoleId: number;
  DefaultRole: AllianceRole;
  Members: AllianceMember[];
  Invitations: Profile[];
  Forum: AllianceForumCategory[];
  Messages: AllianceMessage[];
}
