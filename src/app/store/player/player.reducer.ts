import { ActionReducer } from '@ngrx/store';

import { ActionWithPayload } from '../util';
import { PlayerState, initialPlayerState } from './player.state';
import { PlayerActions } from './player.actions';

export const PlayerReducer: ActionReducer<PlayerState> = (state = initialPlayerState, action: ActionWithPayload) => {
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

    case PlayerActions.UPDATE_REPORTS: {
      const { report, side } = action.payload;
      const playerData = { ...state.playerData, [side]: [report, ...state.playerData[side]] }
      return { ...state, playerData };
    }

    default: {
      return state;
    }
  }
};
