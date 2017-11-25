import { createSelector } from 'reselect';

// import { AuthState } from './auth.state';
import { StoreState } from '../';

export const getTownState = (state: StoreState) => state.town;
export const getPlayerTowns = (state: StoreState) => state.town.playerTowns;
export const getActiveTown = (state: StoreState) => state.town.playerTowns.find((town) => town.id === state.town.activeTown);
export const getProgress = (state: StoreState) => state.town.inProgress;
