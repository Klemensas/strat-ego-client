import { Dict, Town, TownProfile } from 'strat-ego-common';

import { TownActions, TownActionTypes, SendBackSupportSuccess } from './town.actions';

export interface TownState {
  activeTown: number;
  playerTowns: Dict<Town>;
  playerIds: number[];
  entities: Dict<TownProfile>;
  ids: number[];
  loadingIds: Dict<number>;
  inProgress: boolean;
  error: any;
}

export const initialState: TownState = {
  activeTown: null,
  playerTowns: {},
  playerIds: [],
  entities: {},
  ids: [],
  loadingIds: {},
  inProgress: true,
  error: null,
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
    case TownActionTypes.Initialize: {
      const { playerIds, playerTowns, entities } = action.payload.reduce((result, town) => {
        result.playerIds.push(town.id);
        result.playerTowns[town.id] = town;
        result.entities[town.id] = {
          id: town.id,
          name: town.name,
          playerId: town.playerId,
          location: town.location,
          score: town.score,
          createdAt: town.createdAt,
        };
        return result;
      }, { playerIds: [], playerTowns: {}, entities: {} });
      return {
        ...state,
        inProgress: false,
        playerIds,
        playerTowns,
        ids: [...playerIds],
        entities,
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
            // _actionState: {
            //   ...activeTown._actionState,
            //   [target]: { inProgress: true, error: null }
            // }
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
            // _actionState: {
            //   ...activeTown._actionState,
            //   [type]: { inProgress: false, error: action.payload }
            // }
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
            // _actionState: {
            //   ...activeTown._actionState,
            //   name: { inProgress: false, error: null }
            // }
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
            // _actionState: {
            //   ...state.playerTowns[activeTown.id]._actionState,
            //   [target]: { inProgress: false, error: null }
            // }
          }
        }
      };
    }

    case TownActionTypes.SendBackSupportSuccess: {
      const activeTown = state.playerTowns[state.activeTown];
      const updatedTown: Town = {
        ...activeTown,
        targetSupport: activeTown.targetSupport.filter((item) => item.id !== action.payload),
        // _actionState: {
        //   ...state.playerTowns[state.activeTown]._actionState,
        //   support: { inProgress: false, error: null }
        // }
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
        originSupport: activeTown.originSupport.filter((item) => item.id !== action.payload.support),
        targetMovements,
        // _actionState: {
        //   ...state.playerTowns[state.activeTown]._actionState,
        //   support: { inProgress: false, error: null }
        // }
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
          [targetTown.id]: updatedTown,
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
          [targetTown.id]: updatedTown,
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
          [targetTown.id]: updatedTown,
        }
      };
    }

    // case TownActionTypes.Lost: {
    //   const ids = state.ids.filter((id) => id !== action.payload);
    //   const activeTown = state.activeTown === action.payload ? ids[0] || null : state.activeTown;
    //   const playerTowns = { ...state.playerTowns };
    //   delete playerTowns[action.payload];

    //   return {
    //     ...state,
    //     activeTown,
    //     ids,
    //     playerTowns,
    //   };
    // }

    // case TownActionTypes.Conquered: {
    //   const town = action.payload;
    //   town._actionState = TownDefaultActionState;

    //   return {
    //     ...state,
    //     ids: [...state.ids, town.id],
    //     playerTowns: {
    //       ...state.playerTowns,
    //       [town.id]: town,
    //     }
    //   };
    // }

    case TownActionTypes.SupportDisbanded: {
      const { townId, id } = action.payload;

      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [townId]: {
            ...state.playerTowns[townId],
            targetSupport: state.playerTowns[townId].targetSupport.filter((support) => support.id !== id),
          },
        },
      };
    }

    case TownActionTypes.SentSupportDestroyed: {
      const { townId, id } = action.payload;

      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [townId]: {
            ...state.playerTowns[townId],
            originSupport: state.playerTowns[townId].originSupport.filter((support) => support.id !== id),
          },
        },
      };
    }

    case TownActionTypes.SentSupportUpdated: {
      const { townId, id, changes } = action.payload;

      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [townId]: {
            ...state.playerTowns[townId],
            originSupport: state.playerTowns[townId].originSupport.map((support) => support.id === id ? { ...support, ...changes } : support),
          },
        },
      };
    }

    case TownActionTypes.MovementDisbanded: {
      const { townId, id } = action.payload;

      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [townId]: {
            ...state.playerTowns[townId],
            targetMovements: state.playerTowns[townId].targetMovements.filter((movement) => movement.id !== id),
          },
        },
      };
    }

    case TownActionTypes.LoadProfiles: {
      return {
        ...state,
        inProgress: true,
        loadingIds: {
          ...state.loadingIds,
          ...action.payload.reduce((result, id) => {
            result[id] = 1;
            return result;
          }, {}),
        }
      };
    }

    case TownActionTypes.LoadProfilesSuccess: {
      const { newIds, loadingIds } = Object.keys(action.payload).reduce((result, id) => {
        if (!state.entities[id]) { result.newIds.push(+id); }
        delete result.loadingIds[id];

        return result;
      }, { newIds: [], loadingIds: { ...state.loadingIds} });

      return {
        ...state,
        ids: state.ids.concat(newIds),
        entities: {
          ...state.entities,
          ...action.payload
        },
        inProgress: false,
        loadingIds,
      };
    }

    // case TownActionTypes.UpdateEvent:
    default: {
      return state;
    }
  }
}

export const getPlayerTowns = (state: TownState) => state.playerTowns;
export const getTownIds = (state: TownState) => state.ids;
// TODO: this is triggered when switching active town, consider different approach
export const getPlayerTownList = (state: TownState) => state.playerIds.map((id) => state.playerTowns[id]);
export const getActiveTown = (state: TownState) => state.playerTowns[state.activeTown];
export const getEntities = (state: TownState) => state.entities;
