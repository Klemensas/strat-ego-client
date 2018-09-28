import { Player, Dict, PlayerProfile, TownProfile } from 'strat-ego-common';

import { PlayerActions, PlayerActionTypes } from './player.actions';
import { TownActionTypes, TownActions } from '../town/town.actions';

export interface PlayerState {
  inProgress: boolean;
  currentPlayer: Player;
  sidenavs: {
    left: string;
    right: string;
  };
  viewedProfile: number;
  ids: number[];
  entities: Dict<PlayerProfile>;
}

export const initialState: PlayerState = {
  inProgress: false,
  currentPlayer: null,
  sidenavs: {
    left: null,
    right: null,
  },
  viewedProfile: null,
  ids: [],
  entities: {},
};

export function reducer(
  state = initialState,
  action: PlayerActions & any
) {
  switch (action.type) {
    // case PlayerActionTypes.Update:
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

    case PlayerActionTypes.SetSidenav: {
      const sidenavs = { ...state.sidenavs };
      action.payload.forEach(({ side, name }) => sidenavs[side] = name);
      return { ...state, sidenavs };
    }

    case PlayerActionTypes.ViewProfile: {
      return { ...state, viewedProfile: action.payload };
    }

    case PlayerActionTypes.LoadProfiles:
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

    case PlayerActionTypes.LoadProfilesSuccess: {
      const newIds = Object.keys(action.payload).reduce((result, id) => {
        if (!state.entities[id]) { result.push(+id); }
        return result;
      }, []);

      return {
        ...state,
        ids: state.ids.concat(newIds),
        entities: {
          ...state.entities,
          ...action.payload,
        },
        inProgress: false };
    }

    case PlayerActionTypes.ProgressTutorial: {
      const player = state.currentPlayer;
      return {
        ...state,
        currentPlayer: {
          ...player,
          tutorialStag: player.tutorialStage + 1 || 1,
        },
      };
    }

    case PlayerActionTypes.AddReport: {
      const { report, side } = action.payload;
      const reportSide = `${side}Reports`;
      const player = state.currentPlayer;
      const updatedPlayer = { ...player, [reportSide]: [report, ...player[reportSide]] };
      return {
        ...state,
        updatedPlayer,
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
export const getSidenavs = (state: PlayerState) => state.sidenavs;
export const getPlayers = (state: PlayerState) => state.entities;
export const getViewedPlayer = (state: PlayerState) => state.entities[state.viewedProfile];
