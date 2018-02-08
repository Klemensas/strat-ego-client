import { Alliance, AllianceRole } from './alliance.model';

export interface AllianceState {
  playerAlliance: number;
  alliances: {
    [name: string]: Alliance;
  };
  role: AllianceRole;
  invitations: Alliance[];
  inProgress: boolean;
  error: any;
}

export const initialAllianceState: AllianceState = {
  playerAlliance: null,
  alliances: {},
  role: null,
  invitations: [],
  inProgress: false,
  error: null,
};
