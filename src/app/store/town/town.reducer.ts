import { ActionReducer, Action } from '@ngrx/store';

import { TownState, initialTownState } from './town.state';
import { TownActions } from './town.actions';

export const TownReducer: ActionReducer<TownState> = (state = initialTownState, action: Action) => {
  switch (action.type) {
    case TownActions.UPDATE: {
      return { ...state, playerTowns: action.payload };
    }

    case TownActions.SET_ACTIVE_TOWN:
      return { ...state, activeTown: action.payload };

    case TownActions.UPDATE_EVENT:
    case TownActions.UPGRADE_BUILDING:
    case TownActions.CHANGE_NAME:
    case TownActions.SET_PLAYER_TOWNS:
    default: {
      return state;
    }
  }
};
