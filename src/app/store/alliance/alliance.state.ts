import { Alliance, AllianceRole } from './alliance.model';

export interface AllianceState {
  playerAlliance: number;
  alliances: {
    [name: string]: Alliance;
  };
  role: AllianceRole;
  invitations: Alliance[];
}

export const initialAllianceState: AllianceState = {
  playerAlliance: null,
  alliances: {},
  role: null,
  invitations: [],
};
