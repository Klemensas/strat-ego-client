import { Town, TownActionState } from './town.model';
import { TownActions, TownActionTypes } from './town.actions';
import { createSelector } from '@ngrx/store';
import { TownError } from 'strat-ego-common';

interface TownDict {
  [id: number]: Town;
}

export interface TownState {
  inProgress: boolean;
  activeTown: number;
  playerTowns: TownDict;
  ids: number[];
}

export const initialState: TownState = {
  inProgress: true,
  activeTown: null,
  playerTowns: {},
  ids: [],
};

export const TownDefaultActionState: TownActionState = {
  build: { inProgress: false, error: null },
  name: { inProgress: false, error: null },
  movement: { inProgress: false, error: null },
  recruit: { inProgress: false, error: null },
};

export enum actionTypeState {
  '[Town] Rename' = 'name',
  '[Town] Build' = 'build',
  '[Town] Recruit' = 'recruit',
  '[Town] Move troops' = 'movement',
}

export enum actionTypeSuccessState {
  '[Town] Rename Success' = 'name',
  '[Town] Build Success' = 'build',
  '[Town] Recruit Success' = 'recruit',
  '[Town] Move Troops Success' = 'movement',
}

export function reducer(
  state = initialState,
  action: TownActions
): TownState {
  switch (action.type) {
    case TownActionTypes.SetPlayerTowns: {
      const { playerTowns, ids } = action.payload.towns.reduce((result, town) => {
        result.ids.push(town.id);
        result.playerTowns[town.id] = {
          ...town,
          _actionState: TownDefaultActionState,
        };
        return result;
      }, { playerTowns: {}, ids: [] });
      return { ...state, playerTowns, ids, inProgress: false };
    }

    case TownActionTypes.Update: {
      const playerTowns = action.payload.towns.reduce((result, town) => {
        result[town.id] = town;
        result[town.id]._actionState = { ...state.playerTowns[town.id]._actionState, [action.payload.event]: { inProgress: false, error: null } };
        return result;
      }, {});
      return { ...state, playerTowns };
    }

    case TownActionTypes.SetActiveTown: {
      return { ...state, activeTown: action.payload };
    }

    case TownActionTypes.Rename:
    case TownActionTypes.Recruit:
    case TownActionTypes.Build: {
      const activeTown = state.playerTowns[state.activeTown];
      const target = actionTypeState[action.type];
      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [state.activeTown]: {
            ...activeTown,
            _actionState: {
              ...activeTown._actionState,
              [target]: { inProgress: true, error: null }
            }
          }
        }
      };
    }

    case TownActionTypes.RenameFail:
    case TownActionTypes.RecruitFail:
    case TownActionTypes.BuildFail:
    case TownActionTypes.MoveTroopsFail: {
      const activeTown = state.playerTowns[state.activeTown];
      const type = actionTypeState[action.type];
      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [state.activeTown]: {
            ...activeTown,
            _actionState: {
              ...activeTown._actionState,
              [type]: { inProgress: false, error: action.payload }
            }
          }
        }
      };
    }

    case TownActionTypes.RenameSuccess: {
      const activeTown = state.playerTowns[state.activeTown];
      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [state.activeTown]: {
            ...activeTown,
            name: action.payload,
            _actionState: {
              ...activeTown._actionState,
              name: { inProgress: false, error: null }
            }
          }
        }
      };
    }

    case TownActionTypes.RecruitSuccess:
    case TownActionTypes.BuildSuccess:
    case TownActionTypes.MoveTroopsSuccess: {
      const target = actionTypeSuccessState[action.type];
      const activeTown = action.payload;
      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [state.activeTown]: {
            ...activeTown,
            _actionState: {
              ...activeTown._actionState,
              [target]: { inProgress: false, error: null }
            }
          }
        }
      };
    }

    // case TownActionTypes.UpdateEvent:
    default: {
      return state;
    }
  }
}

export const getPlayerTowns = (state: TownState) => state.playerTowns;
export const getActiveTown = (state: TownState) => state.playerTowns[state.activeTown];
