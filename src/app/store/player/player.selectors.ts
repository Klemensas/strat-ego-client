import { createSelector } from 'reselect';

// import { AuthState } from './auth.state';
import { StoreState } from '../';

export const getPlayerState = (state: StoreState) => state.player;
export const getPlayerData = (state: StoreState) => state.player.playerData;
// export const getProgress = (state: StoreState) => state.auth.inProgress;
// export const getError = (state: StoreState) => state.auth.error;
