import { ActionReducer } from '@ngrx/store';

import { ActionWithPayload } from '../util';
import { MapState, initialMapState } from './map.state';
import { MapActions } from './map.actions';

export const MapReducer: ActionReducer<MapState> = (state = initialMapState, action: ActionWithPayload) => {
  switch (action.type) {
    case MapActions.UPDATE:
      return { ...state, mapData: action.payload };

    default: {
      return state;
    }
  }
};
