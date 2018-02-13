import { createSelector } from '@ngrx/store';

export const getMapData = (state: any) => state.game.map.mapData;
// export const getActiveTown = (state: StoreState) => state.auth.user;
// export const getProgress = (state: StoreState) => state.auth.inProgress;
// export const getError = (state: StoreState) => state.auth.error;
