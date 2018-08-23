import { Dict, MapTown } from 'strat-ego-common';

import { MapActions, MapActionTypes } from './map.actions';

export interface MapState {
  inProgress: boolean;
  activeTown: number;
  mapData: Dict<MapTown>;
}

export const initialState: MapState = {
  inProgress: false,
  activeTown: null,
  mapData: null
};

export function reducer(
  state = initialState,
  action: MapActions
): MapState {
  switch (action.type) {
    case MapActionTypes.Update:
      return { ...state, mapData: action.payload };

    default: {
      return state;
    }
  }
}

export const getMapData = (state: MapState) => state.mapData;
