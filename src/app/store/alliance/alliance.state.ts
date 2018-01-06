import { Alliance, AllianceRole } from './alliance.model';

export interface AllianceState {
  playerAlliance: number;
  playerName: string;
  alliances: {
    [name: string]: Alliance;
  };
  role: AllianceRole;
  invitations: Alliance[];
}

export const initialAllianceState: AllianceState = {
  playerAlliance: null,
  playerName: '',
  alliances: {},
  role: null,
  invitations: [],
};
