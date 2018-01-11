// TODO: consider refactoring out hardcoded values
export const ALLIANCE_PERMISSIONS: permissionNames[] = [
  'viewInvites',
  'editInvites',
  'viewManagement',
  'manageMinorRoles',
  'manageAllRoles',
  'editProfile',
];

export const PERMISSION_NAMES: { [name in permissionNames]: string } = {
  viewInvites: '<i class="fa fa-eye"></i><i class="fa fa-envelope-open-o"></i>',
  editInvites: '<i class="fa fa-edit"></i><i class="fa fa-envelope-open-o"></i>',
  viewManagement: '<i class="fa fa-eye"></i><i class="fa fa-id-card-o"></i>',
  manageMinorRoles: '<i class="fa fa-edit"></i><i class="fa fa-id-badge"></i>',
  manageAllRoles: '<i class="fa fa-edit"></i><i class="fa fa-id-card-o"></i>',
  editProfile: '<i class="fa fa-edit"></i><i class="fa fa-tasks"></i>',
};

export type permissionNames =
  'viewInvites' |
  'editInvites' |
  'viewManagement' |
  'manageMinorRoles' |
  'manageAllRoles' |
  'editProfile';


export interface Profile {
  id: number;
  name: string;
  createdAt: string;
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

export interface Alliance extends AllianceBase {
  Roles: AllianceRole[];
  DefaultRoleId: number;
  DefaultRole: AllianceRole;
  Members: AllianceMember[];
  Invitations: Profile[];
}
