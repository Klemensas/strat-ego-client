import { createSelector } from '@ngrx/store';

export const getAllianceState = (state: any) => state.game.alliance;
export const getPlayerAlliance = (state: any) => state.game.alliance.alliances[state.game.alliance.playerAlliance];
export const getPlayerInvitations = (state: any) => state.game.alliance.invitations;
export const getPlayerAllianceData = (state: any) => ({
  alliance: state.game.alliance.alliances[state.game.alliance.playerAlliance],
  role: state.game.alliance.role,
});
