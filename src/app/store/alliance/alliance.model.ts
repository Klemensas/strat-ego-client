export interface AllianceBase {
  id: number;
  name: string;
}

export interface AllianceRole {
  name: string;
  permissions: string[];
}

export interface Alliance extends AllianceBase {
  memberCount: number;
  roles: AllianceRole[];
}
