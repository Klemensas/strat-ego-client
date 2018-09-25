import { PlayerProfile, Dict } from 'strat-ego-common';

import { environment } from '../../../environments/environment';
import { RankingsActions, RankingsActionTypes } from './rankings.actions';

export interface RankingsState {
  inProgress: boolean;
  error: any;
  lastUpdate: number;
  updateFrequencey: number;
  ids: number[];
  playerPosition: number;
}

export const initialState: RankingsState = {
  inProgress: false,
  lastUpdate: null,
  error: null,
  updateFrequencey: environment.rankingUpdateFrequency,
  ids: [],
  playerPosition: null,
};

export function reducer(
  state = initialState,
  action: RankingsActions
) {
  switch (action.type) {
    case RankingsActionTypes.Load: {
      return {
        ...state,
        inProgress: true,
        error: null,
      };
    }

    case RankingsActionTypes.LoadSuccess: {
      return {
        ...state,
        ids: action.payload.rankings,
        inProgress: false,
        lastUpdate: Date.now(),
        rankings: action.payload.rankings,
        playerPosition: action.payload.rankings.indexOf(action.payload.playerId)
      };
    }

    case RankingsActionTypes.LoadFail: {
      return {
        ...state,
        inProgress: false,
        error: action.payload,
      };
    }

    case RankingsActionTypes.LoadStagnated: {
      return {
        ...state,
        inProgress: false,
        lastUpdate: Date.now(),
      };
    }

    case RankingsActionTypes.CheckForUpdate:
    default: {
      return state;
    }
  }
}

export const getRankingIds = (state: RankingsState) => state.ids;
export const getPlayerPosition = ({ playerPosition }: RankingsState) => playerPosition;
export const getRankingsUpdate = ({ lastUpdate, updateFrequencey }: RankingsState) => ({ lastUpdate, updateFrequencey });
export const getRankingsProgress = (state: RankingsState) => state.inProgress;
