import { createSelector } from 'reselect';

// import { AuthState } from './auth.state';
import { StoreState } from '../';

export const getMapData = (state: StoreState) => state.map.mapData;
// export const getActiveTown = (state: StoreState) => state.auth.user;
// export const getProgress = (state: StoreState) => state.auth.inProgress;
// export const getError = (state: StoreState) => state.auth.error;
