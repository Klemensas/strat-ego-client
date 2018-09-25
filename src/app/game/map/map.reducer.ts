import { Dict } from 'strat-ego-common';

import { MapActions, MapActionTypes } from './map.actions';

export interface MapState {
  inProgress: boolean;
  mapData: Dict<number>;
}

export const initialState: MapState = {
  inProgress: false,
  mapData: {}
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
