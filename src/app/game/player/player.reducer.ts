import { Player, Dict } from 'strat-ego-common';

import { PlayerActions, PlayerActionTypes } from './player.actions';

export interface PlayerState {
  inProgress: boolean;
  activeTown: number;
  currentPlayer: number;
  sidenavs: {
    left: string;
    right: string;
  };
  players: Dict<Partial<Player>>;
  viewedProfile: number;
}

export const initialState: PlayerState = {
  inProgress: false,
  activeTown: null,
  currentPlayer: null,
  sidenavs: {
    left: null,
    right: null,
  },
  players: {},
  viewedProfile: null,
};

export function reducer(
  state = initialState,
  action: PlayerActions
) {
  switch (action.type) {
    case PlayerActionTypes.Update:
      const currentPlayer = action.payload.id;
      return {
        ...state,
        inProgress: false,
        currentPlayer,
        players: {
          [currentPlayer]: action.payload,
        }
      };

    case PlayerActionTypes.SetSidenav: {
      const sidenavs = { ...state.sidenavs };
      action.payload.forEach(({ side, name }) => sidenavs[side] = name);
      return { ...state, sidenavs };
    }

    case PlayerActionTypes.ViewProfile: {
      return { ...state, viewedProfile: action.payload };
    }

    case PlayerActionTypes.LoadProfile:
    case PlayerActionTypes.UpdateProfile:
    case PlayerActionTypes.RemoveAvatar: {
      return { ...state, error: null, inProgress: true };
    }

    case PlayerActionTypes.UpdateProfileSuccess:
    case PlayerActionTypes.RemoveAvatarSuccess: {
      return {
        ...state,
        inProgress: false,
        players: {
          ...state.players,
          [state.currentPlayer]: {
            ...state.players[state.currentPlayer],
            ...action.payload,
          }
        }
      };
    }

    case PlayerActionTypes.LoadProfileSuccess: {
      return {
        ...state,
        players: {
          ...state.players,
          [action.payload.id]: action.payload,
        },
        inProgress: false };
    }

    // case PlayerActionTypes.Report: {
    //   const { report, side } = action.payload;
    //   const playerData = { ...state.playerData, [side]: [report, ...state.playerData[side]] };
    //   return { ...state, playerData };
    // }

    default: {
      return state;
    }
  }
}

export const getCurrentPlayer = (state: PlayerState) => state.players[state.currentPlayer];
export const getPlayerReports = (state: PlayerState) => ({
  originReports: state.players[state.currentPlayer].originReports,
  targetReports: state.players[state.currentPlayer].targetReports,
});
export const getSidenavs = (state: PlayerState) => state.sidenavs;
export const getViewedPlayer = (state: PlayerState) => state.players[state.viewedProfile];
export const getPlayers = (state: PlayerState) => state.players;
