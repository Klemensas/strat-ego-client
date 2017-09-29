import { ActionReducer, Action } from '@ngrx/store';

import { PlayerState, initialPlayerState } from './player.state';
import { PlayerActions } from './player.actions';

export const PlayerReducer: ActionReducer<PlayerState> = (state = initialPlayerState, action: Action) => {
  switch (action.type) {
    case PlayerActions.SET_PROGRESS:
      return { ...state, inProgress: true };

    case PlayerActions.UPDATE:
      return { ...state, inProgress: false, playerData: action.payload };

      case PlayerActions.SET_SIDENAV: {
        const sidenavs = { ...state.sidenavs };
        action.payload.forEach(({ side, name }) => sidenavs[side] = name);
        return { ...state, sidenavs };
      }

    default: {
      return state;
    }
  }
};
