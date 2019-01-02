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

export enum actionPropertyType {
  '[Town] Build Success' = 'buildingQueues',
  '[Town] Recruit Success' = 'unitQueues',
  '[Town] Move Troops Success' = 'originMovements',
  // '[Town] Recall Support Success' = 'support',
  // '[Town] Send Back Support Success' = 'support',
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
      return {
        ...state,
        inProgress: true,
      };
    }

    case TownActionTypes.RenameFail:
    case TownActionTypes.RecruitFail:
    case TownActionTypes.BuildFail:
    case TownActionTypes.MoveTroopsFail:
    case TownActionTypes.RecallSupportFail:
    case TownActionTypes.SendBackSupportFail: {
      return {
        ...state,
        inProgress: false,
        error: action.payload,
      };
    }

    case TownActionTypes.RenameSuccess: {
      const target = action.payload.town;
      const name = action.payload.name;
      const activeTown = state.playerTowns[target];
      return {
        ...state,
        inProgress: false,
        playerTowns: {
          ...state.playerTowns,
          [target]: {
            ...activeTown,
            name,
          }
        },
        entities: {
          ...state.entities,
          [target]: {
            ...state.entities[target],
            name,
          }
        }
      };
    }

    case TownActionTypes.RecruitSuccess:
    case TownActionTypes.BuildSuccess:
    case TownActionTypes.MoveTroopsSuccess: {
      const queue = actionPropertyType[action.type];
      const currentTown = state.playerTowns[action.payload.town.id];
      const newTown = {
        ...currentTown,
        ...action.payload.town,
        // TODO: find a solution to avoid casting to any
        [queue]: currentTown[<any>queue].concat(action.payload.item),
      };

      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [currentTown.id]: newTown
        }
      };
    }

    case TownActionTypes.SendBackSupportSuccess: {
      const activeTown = state.playerTowns[action.payload.town];
      const updatedTown: Town = {
        ...activeTown,
        targetSupport: activeTown.targetSupport.filter((item) => item.id !== action.payload.support),
      };
      return {
        ...state,
        inProgress: false,
        playerTowns: {
          ...state.playerTowns,
          [updatedTown.id]: updatedTown,
        }
      };
    }

    case TownActionTypes.RecallSupportSuccess: {
      const activeTown = state.playerTowns[action.payload.town];
      const targetMovements = activeTown.targetMovements.concat(action.payload.movement).sort((a, b) => +a.endsAt - +b.endsAt);
      const updatedTown: Town = {
        ...activeTown,
        originSupport: activeTown.originSupport.filter((item) => item.id !== action.payload.support),
        targetMovements,
      };
      return {
        ...state,
        inProgress: false,
        playerTowns: {
          ...state.playerTowns,
          [updatedTown.id]: updatedTown,
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

    case TownActionTypes.SupportArrived:
    case TownActionTypes.SupportStationed: {
      const supportType = action.type === TownActionTypes.SupportArrived ? 'originSupport' : 'targetSupport';
      const movementType = action.type === TownActionTypes.SupportArrived ? 'originMovements' : 'targetMovements';
      const town = state.playerTowns[action.payload.town];
      const newTown = {
        ...town,
        [supportType]: town[supportType].concat(action.payload.support),
        [movementType]: town[movementType].filter(({ id }) => id !== action.payload.movement),
      };
      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [town.id]: newTown,
        }
      };
    }

    case TownActionTypes.TroopsReturned: {
      const targetTown = state.playerTowns[action.payload.town.id];
      const newTown = {
        ...targetTown,
        ...action.payload.town,
        targetMovements: targetTown.targetMovements.filter(({ id }) => id !== action.payload.movement),
      };
      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [newTown.id]: newTown,
        }
      };
    }

    case TownActionTypes.RecruitmentCompleted:
    case TownActionTypes.BuildingCompleted: {
      const queueType = action.type === TownActionTypes.RecruitmentCompleted ? 'unitQueues' : 'buildingQueues';
      const currentTown = state.playerTowns[action.payload.town.id];
      const queue = currentTown[queueType] as { id: number }[];
      const newTown = {
        ...currentTown,
        ...action.payload.town,
        [queueType]: queue.filter(({ id }) => id !== action.payload.item),
      };
      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [newTown.id]: newTown,
        }
      };
    }

    case TownActionTypes.AttackOutcome: {
      const town = state.playerTowns[action.payload.report.originTownId];
      const updatedTown = {
        ...town,
        originMovements: town.originMovements.filter(({ id }) => id !== action.payload.movement),
      };
      if (action.payload.newMovement) {
        updatedTown.targetMovements.push(action.payload.newMovement);
      }

      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [town.id]: updatedTown,
        },
      };
    }

    case TownActionTypes.Attacked: {
      const targetTown = state.playerTowns[action.payload.town.id];
      const updatedTown = {
        ...targetTown,
        ...action.payload.town,
        targetMovements: targetTown.targetMovements.filter(({ id }) => id !== action.payload.movement),
      };

      return {
        ...state,
        playerTowns: {
          ...state.playerTowns,
          [updatedTown.id]: updatedTown,
        },
      };
    }

    case TownActionTypes.Lost: {
      const playerIds = state.playerIds.filter((id) => id !== action.payload.townId);
      const activeTown = state.activeTown === action.payload.townId ? playerIds[0] || null : state.activeTown;
      const playerTowns = { ...state.playerTowns };

      delete playerTowns[action.payload.townId];
      const entities = {
        ...state.entities,
        [action.payload.townId]: {
          ...state.entities[action.payload.townId],
            playerId: action.payload.report.originPlayerId,
        }
      };

      return {
        ...state,
        activeTown,
        playerIds,
        playerTowns,
        entities,
      };
    }

    case TownActionTypes.Conquered: {
      const town = action.payload.town;
      const newId = [];

      // Add id only if entity not present already
      if (!state.entities[town.id]) {
        newId.push(town.id);
      }

      return {
        ...state,
        playerIds: state.playerIds.concat(town.id),
        playerTowns: {
          ...state.playerTowns,
          [town.id]: town,
        },
        ids: state.ids.concat(newId),
        entities: {
          ...state.entities,
          [town.id]: {
            id: town.id,
            name: town.name,
            playerId: town.playerId,
            location: town.location,
            score: town.score,
            createdAt: town.createdAt,
          }
        }
      };
    }

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
