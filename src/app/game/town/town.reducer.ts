import { createSelector } from '@ngrx/store';
import { TownError } from 'strat-ego-common';

import { Town, TownActionState } from './town.model';
import { TownActions, TownActionTypes, SendBackSupportSuccess } from './town.actions';

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
  support: { inProgress: false, error: null },
};

export enum actionTypeState {
  '[Town] Rename' = 'name',
  '[Town] Build' = 'build',
  '[Town] Recruit' = 'recruit',
  '[Town] Move troops' = 'movement',
  '[Town] Recall Support' = 'support',
  '[Town] Send Back Support' = 'support',
}

export enum actionTypeSuccessState {
  '[Town] Rename Success' = 'name',
  '[Town] Build Success' = 'build',
  '[Town] Recruit Success' = 'recruit',
  '[Town] Move Troops Success' = 'movement',
  '[Town] Recall Support Success' = 'support',
  '[Town] Send Back Support Success' = 'support',
}

export enum actionTypeFailState {
  '[Town] Rename Fail' = 'name',
  '[Town] Build Fail' = 'build',
  '[Town] Recruit Fail' = 'recruit',
  '[Town] Move Troops Fail' = 'movement',
  '[Town] Recall Support Fail' = 'support',
  '[Town] Send Back Support Fail' = 'support',
}

// Notde: currently active town is selected from the current one. Consider reworking that.
// This might cause an issue if doing an action doesn't block the user and he switches to another town
export function reducer(
  state = initialState,
  action: TownActions
): TownState {
  switch (action.type) {
    case TownActionTypes.SetPlayerTowns: {
      const { playerTowns, ids } = action.payload.reduce((result, town) => {
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
      const targetTown = state.playerTowns[action.payload.id];
      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [action.payload.id]: {
            ...targetTown,
            ...action.payload,
          }
        }
      };
    }

    case TownActionTypes.SetActiveTown: {
      return { ...state, activeTown: action.payload };
    }

    case TownActionTypes.Rename:
    case TownActionTypes.Recruit:
    case TownActionTypes.Build:
    case TownActionTypes.RecallSupport:
    case TownActionTypes.SendBackSupport: {
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
    case TownActionTypes.MoveTroopsFail:
    case TownActionTypes.RecallSupportFail:
    case TownActionTypes.SendBackSupportFail: {
      const activeTown = state.playerTowns[state.activeTown];
      const type = actionTypeFailState[action.type];
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

    case TownActionTypes.SendBackSupportSuccess: {
      const activeTown = state.playerTowns[state.activeTown];
      const updatedTown: Town = {
        ...activeTown,
        targetSupport: activeTown.targetSupport.filter((item) => item.id !== action.payload),
        _actionState: {
          ...state.playerTowns[state.activeTown]._actionState,
          support: { inProgress: false, error: null }
        }
      };
      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [state.activeTown]: updatedTown,
        }
      };
    }

    case TownActionTypes.RecallSupportSuccess: {
      const activeTown = state.playerTowns[state.activeTown];
      const targetMovements = [...activeTown.targetMovements, action.payload.movement].sort((a, b) => +a.endsAt - +b.endsAt);
      const updatedTown: Town = {
        ...activeTown,
        targetSupport: activeTown.targetSupport.filter((item) => item.id !== action.payload.support),
        targetMovements,
        _actionState: {
          ...state.playerTowns[state.activeTown]._actionState,
          support: { inProgress: false, error: null }
        }
      };
      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [state.activeTown]: updatedTown,
        }
      };
    }

    case TownActionTypes.SupportSentBack: {
      const targetTown = state.playerTowns[action.payload.movement.targetTown.id];
      const targetMovements = [...targetTown.targetMovements, action.payload.movement].sort((a, b) => +a.endsAt - +b.endsAt);
      const updatedTown: Town = {
        ...targetTown,
        originSupport: targetTown.originSupport.filter((item) => item.id !== action.payload.support),
        targetMovements,
      };
      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [state.activeTown]: updatedTown,
        }
      };
    }

    case TownActionTypes.SupportRecalled: {
      const targetTown = state.playerTowns[action.payload.town];
      const updatedTown: Town = {
        ...targetTown,
        targetSupport: targetTown.targetSupport.filter((item) => item.id !== action.payload.support),
      };
      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [state.activeTown]: updatedTown,
        }
      };
    }

    case TownActionTypes.IncomingMovement: {
      const targetTown = state.playerTowns[action.payload.targetTown.id];
      const updatedTown: Town = {
        ...targetTown,
        targetMovements: [...targetTown.targetMovements, action.payload].sort((a, b) => +a.endsAt - +b.endsAt),
      };
      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [state.activeTown]: updatedTown,
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