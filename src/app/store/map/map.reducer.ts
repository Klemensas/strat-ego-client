import { ActionReducer, Action } from '@ngrx/store';

import { MapState, initialMapState } from './map.state';
import { MapActions } from './map.actions';

export const MapReducer: ActionReducer<MapState> = (state = initialMapState, action: Action) => {
  switch (action.type) {
    case MapActions.UPDATE:
      return { ...state, mapData: action.payload };

    default: {
      return state;
    }
  }
};
