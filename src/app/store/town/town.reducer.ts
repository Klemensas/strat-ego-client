import { Town, TownActionState } from './town.model';
import { TownActions, TownActionTypes } from './town.actions';

export interface TownState {
  inProgress: boolean;
  activeTown: number;
  playerTowns: Town[];
}

export const initialState: TownState = {
  inProgress: true,
  activeTown: null,
  playerTowns: [],
};

export const TownDefaultActionState: TownActionState = {
  build: false,
  name: false,
  movement: false,
  recruit: false,
};


export function reducer(
  state = initialState,
  action: TownActions
): TownState {
  switch (action.type) {
    case TownActionTypes.Update: {
      const playerTowns = [ ...state.playerTowns];
      action.payload.towns.forEach((town) => {
        const currentTown = playerTowns.findIndex(t => t.id === town.id);
        playerTowns[currentTown] = town;
        playerTowns[currentTown]._actionState = { ...state.playerTowns[currentTown]._actionState, [action.payload.event]: false};
      });
      return { ...state, playerTowns };
    }

    case TownActionTypes.SetPlayerTowns: {
      const playerTowns = action.payload.towns.map((town) => ({
        ...town,
        _actionState: TownDefaultActionState,
      }));
      return { ...state, playerTowns, inProgress: false };
    }

    case TownActionTypes.SetActiveTown:
      return { ...state, activeTown: action.payload };

    case TownActionTypes.Recruit: {
      const playerTowns = [...state.playerTowns];
      const recruitingTown = playerTowns.findIndex(t => t.id === state.activeTown);
      playerTowns[recruitingTown]._actionState.recruit = true;
      return { ...state, playerTowns };
    }

    case TownActionTypes.Recruit: {
      const playerTowns = [...state.playerTowns];
      const recruitingTown = playerTowns.findIndex(t => t.id === state.activeTown);
      playerTowns[recruitingTown]._actionState.recruit = true;
      return { ...state, playerTowns };
    }

    case TownActionTypes.SendTroops: {
      const playerTowns = [...state.playerTowns];
      const recruitingTown = playerTowns.findIndex(t => t.id === state.activeTown);
      playerTowns[recruitingTown]._actionState.movement = true;
      return { ...state, playerTowns };
    }

    case TownActionTypes.UpdateEvent:
    case TownActionTypes.Recruit:
    case TownActionTypes.UpgradeBuilding:
    case TownActionTypes.ChangeName:
    default: {
      return state;
    }
  }
}

export const getPlayerTowns = (state: TownState) => state.playerTowns;
export const getActiveTown = (state: TownState) => state.playerTowns.find((town) => town.id === state.activeTown);
