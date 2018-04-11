import { Player } from 'strat-ego-common';

import { PlayerActions, PlayerActionTypes } from './player.actions';

export interface PlayerState {
  inProgress: boolean;
  activeTown: number;
  playerData: Player;
  sidenavs: {
    left: string;
    right: string;
  };
}

export const initialState: PlayerState = {
  inProgress: false,
  activeTown: null,
  playerData: null,
  sidenavs: {
    left: null,
    right: null,
  }
};

export function reducer(
  state = initialState,
  action: PlayerActions
) {
  switch (action.type) {
    case PlayerActionTypes.Update:
      return { ...state, inProgress: false, playerData: action.payload };

    case PlayerActionTypes.SetSidenav: {
      const sidenavs = { ...state.sidenavs };
      action.payload.forEach(({ side, name }) => sidenavs[side] = name);
      return { ...state, sidenavs };
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

export const getPlayerData = (state: PlayerState) => state.playerData;
export const getPlayerReports = (state: PlayerState) => ({
  originReports: state.playerData.originReports,
  targetReports: state.playerData.targetReports,
});
export const getSidenavs = (state: PlayerState) => state.sidenavs;
