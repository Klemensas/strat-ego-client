import { createSelector } from 'reselect';

// import { AuthState } from './auth.state';
import { StoreState } from '../';

export const getPlayerState = (state: StoreState) => state.player;
export const getPlayerData = (state: StoreState) => state.player.playerData;
export const getPlayerReports = ((state: StoreState) => ({
  ReportOrigin: state.player.playerData.ReportOriginPlayer,
  ReportDestination: state.player.playerData.ReportDestinationPlayer,
}));
export const getSidenavs = (state: StoreState) => state.player.sidenavs;
// export const getProgress = (state: StoreState) => state.auth.inProgress;
// export const getError = (state: StoreState) => state.auth.error;
