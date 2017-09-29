import { ActionReducer, Action } from '@ngrx/store';

import { TownDefaultActionState } from './town.model';
import { TownState, initialTownState } from './town.state';
import { TownActions } from './town.actions';

export const TownReducer: ActionReducer<TownState> = (state = initialTownState, action: Action) => {
  switch (action.type) {
    case TownActions.UPDATE: {
      const playerTowns = [ ...state.playerTowns];
      action.payload.towns.forEach((town) => {
        const currentTown = playerTowns.findIndex(t => t._id === town._id);
        playerTowns[currentTown] = town;
        playerTowns[currentTown]._actionState = { ...state.playerTowns[currentTown]._actionState, [action.payload.event]: false};
      })
      return { ...state, playerTowns };
    }

    case TownActions.SET_PLAYER_TOWNS: {
      const playerTowns = action.payload.towns.map((town) => ({
        ...town,
        _actionState: TownDefaultActionState,
      }));
      return { ...state, playerTowns };
    }

    case TownActions.SET_ACTIVE_TOWN:
      return { ...state, activeTown: action.payload };

    case TownActions.RECRUIT: {
      const playerTowns = [...state.playerTowns];
      const recruitingTown = playerTowns.findIndex(t => t._id === state.activeTown);
      playerTowns[recruitingTown]._actionState.recruit = true;
      return { ...state, playerTowns };
    }

    case TownActions.RECRUIT: {
      const playerTowns = [...state.playerTowns];
      const recruitingTown = playerTowns.findIndex(t => t._id === state.activeTown);
      playerTowns[recruitingTown]._actionState.recruit = true;
      return { ...state, playerTowns };
    }

    case TownActions.SEND_TROOPS: {
      const playerTowns = [...state.playerTowns];
      const recruitingTown = playerTowns.findIndex(t => t._id === state.activeTown);
      playerTowns[recruitingTown]._actionState.movement = true;
      return { ...state, playerTowns };
    }

    case TownActions.SET_PLAYER_TOWNS:
    case TownActions.UPDATE_EVENT:
    case TownActions.RECRUIT:
    case TownActions.UPGRADE_BUILDING:
    case TownActions.CHANGE_NAME:
    default: {
      return state;
    }
  }
};
