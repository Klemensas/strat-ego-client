import { RankProfile } from 'strat-ego-common';

import { environment } from '../../../environments/environment';
import { RankingsActions, RankingsActionTypes } from './rankings.actions';

export interface RankingsState {
  inProgress: boolean;
  error: any;
  lastUpdate: number;
  updateFrequencey: number;
  rankings: RankProfile[];
  playerPosition: number;
}

export const initialState: RankingsState = {
  inProgress: false,
  lastUpdate: null,
  error: null,
  updateFrequencey: environment.rankingUpdateFrequency,
  rankings: [],
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
        inProgress: false,
        lastUpdate: Date.now(),
        rankings: action.payload.rankings,
        playerPosition: action.payload.rankings.findIndex(({ id }) => id === action.payload.playerId)
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

export const getRankings = (state: RankingsState) => state.rankings;
export const getPositionRankings = ({ rankings, playerPosition }: RankingsState) => ({ rankings, playerPosition });
export const getRankingsUpdate = ({ lastUpdate, updateFrequencey }: RankingsState) => ({ lastUpdate, updateFrequencey });
export const getRankingsProgress = (state: RankingsState) => state.inProgress;
