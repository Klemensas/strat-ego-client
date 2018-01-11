import { createSelector } from 'reselect';

import { StoreState } from '../';

export const getAllianceState = (state: StoreState) => state.alliance;
export const getPlayerAlliance = (state: StoreState) => state.alliance.alliances[state.alliance.playerAlliance];
export const getPlayerInvitations = (state: StoreState) => state.alliance.invitations;
export const getPlayerAllianceData = (state: StoreState) => ({
  alliance: state.alliance.alliances[state.alliance.playerAlliance],
  role: state.alliance.role,
});
