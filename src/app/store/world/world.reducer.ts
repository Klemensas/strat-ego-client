import { ActionReducer } from '@ngrx/store';

import { ActionWithPayload } from '../util';
import { WorldState, initialWorldState } from './world.state';
import { WorldActions } from './world.actions';

export const WorldReducer: ActionReducer<WorldState> = (state = initialWorldState, action: ActionWithPayload) => {
  switch (action.type) {
    case WorldActions.LOAD_SUCCESS:
      return { ...state, worlds: [...state.worlds, ...action.payload] };

      case WorldActions.SELECT_WORLD:
      return { ...state, activeWorld: action.payload };

    case WorldActions.LOAD:
    case WorldActions.LOAD_FAIL:
    default: {
      return state;
    }
  }
};
