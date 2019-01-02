import { Player, Dict, PlayerProfile, TownProfile } from 'strat-ego-common';

import { PlayerActions, PlayerActionTypes } from './player.actions';
import { TownActionTypes, TownActions } from '../town/town.actions';
import { createSelector } from '@ngrx/store';

export interface PlayerState {
  inProgress: boolean;
  currentPlayer: Player;
  viewedProfile: number;
  loadingIds: Dict<number>;
  ids: number[];
  entities: Dict<PlayerProfile>;
}

export const initialState: PlayerState = {
  inProgress: false,
  currentPlayer: null,
  viewedProfile: null,
  loadingIds: {},
  ids: [],
  entities: {},
};

export function reducer(
  state = initialState,
  action: PlayerActions | TownActions
) {
  switch (action.type) {
    case PlayerActionTypes.Initialize:
      const currentPlayer = action.payload;
      return {
        ...state,
        inProgress: false,
        currentPlayer,
        ids: [currentPlayer.id],
        entities: {
          [currentPlayer.id]: {
            id: currentPlayer.id,
            name: currentPlayer.name,
            allianceId: currentPlayer.allianceId,
            towns: [],
            description: currentPlayer.description,
            avatarUrl: currentPlayer.avatarUrl,
            createdAt: currentPlayer.createdAt,
          }
        }
      };

    case TownActionTypes.Initialize: {
      const playerProfile = state.entities[state.currentPlayer.id];
      const { towns, playerScore }: { playerScore: number, towns: Array<Partial<TownProfile>> } = action.payload.reduce((result, { id, score }) => {
        result.towns.push({ id });
        result.playerScore += score;
        return result;
      }, { towns: [], playerScore: 0 });
      return {
        ...state,
        entities: {
          ...state.entities,
          [playerProfile.id]: {
            ...playerProfile,
            towns,
            score: playerScore
          }
        }
      };
    }

    case PlayerActionTypes.ViewProfile: {
      return { ...state, viewedProfile: action.payload };
    }

    case PlayerActionTypes.UpdateProfile:
    case PlayerActionTypes.RemoveAvatar: {
      return { ...state, error: null, inProgress: true };
    }

    case PlayerActionTypes.UpdateProfileSuccess:
    case PlayerActionTypes.RemoveAvatarSuccess: {
      return {
        ...state,
        inProgress: false,
        currentPlayer: {
          ...state.currentPlayer,
          ...action.payload
        },
      };
    }

    case PlayerActionTypes.LoadProfiles: {
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

    case PlayerActionTypes.LoadProfilesSuccess: {
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
          ...action.payload,
        },
        inProgress: false,
        loadingIds,
      };
    }

    case PlayerActionTypes.ProgressTutorial: {
      const player = state.currentPlayer;
      return {
        ...state,
        currentPlayer: {
          ...player,
          tutorialStage: player.tutorialStage + 1 || 1,
        },
      };
    }

    case TownActionTypes.Lost: {
      const playerProfile = state.entities[state.currentPlayer.id];
      const entities = {
        ...state.entities,
        [playerProfile.id]: {
          ...state.entities[playerProfile.id],
          towns: playerProfile.towns.filter(({ id }) => id !== action.payload.townId)
        },
      };

      // Update conquering player profile if present
      const targetId = action.payload.report.originPlayerId;
      const conquerorProfile = state.entities[targetId];
      if (conquerorProfile) {
        entities[targetId] = {
          ...conquerorProfile,
          towns: conquerorProfile.towns.concat({ id: action.payload.townId })
        };
      }

      return {
        ...state,
        entities,
      };
    }
    case TownActionTypes.Conquered: {
      const playerProfile = state.entities[state.currentPlayer.id];
      const entities = {
        ...state.entities,
        [playerProfile.id]: {
          ...playerProfile,
          towns: playerProfile.towns.concat({ id: action.payload.town.id }),
        }
      };

      // Update conquered player profile if present
      const targetId = action.payload.report.targetPlayerId;
      const conqueredProfile = state.entities[targetId];
      if (conqueredProfile) {
        entities[targetId].towns = entities[targetId].towns.filter(({ id }) => id !== action.payload.town.id);
      }
      return {
        ...state,
        entities,
      };
    }

    default: {
      return state;
    }
  }
}

export const getCurrentPlayer = (state: PlayerState) => state.currentPlayer;
export const getPlayerId = createSelector(getCurrentPlayer, (player) => player ? player.id : null);
export const getEntities = (state: PlayerState) => state.entities;
export const getTutorialStage = (state: any) => state.entities[state.currentPlayer].tutorialStage;
export const getPlayers = (state: PlayerState) => state.entities;
export const getViewedPlayer = (state: PlayerState) => state.entities[state.viewedProfile];
