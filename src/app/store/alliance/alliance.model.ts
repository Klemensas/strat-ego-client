export interface Profile {
  id: number;
  name: string;
  createdAt: string;
}

export interface AllianceMember extends Profile {
  allianceName: string;
  allianceRole: string;
}

export interface AllianceBase {
  id: number;
  name: string;
}

export interface AllianceRole {
  name: string;
  permissions: string[];
}

export interface Alliance extends AllianceBase {
  roles: AllianceRole[];
  Members: AllianceMember[];
  Invitations: Profile[];
}
