import { Alliance } from './alliance.model';

export interface AllianceState {
  playerAlliance: number;
  alliances: {
    [name: string]: Alliance;
  };
  permissions: string[];
  invitations: Alliance[];
}

export const initialAllianceState: AllianceState = {
  playerAlliance: null,
  alliances: {},
  permissions: [],
  invitations: [],
};
