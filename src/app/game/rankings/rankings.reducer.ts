import { PlayerProfile, Dict } from 'strat-ego-common';

import { environment } from '../../../environments/environment';
import { RankingsActions, RankingsActionTypes } from './rankings.actions';

export interface RankingsState {
  inProgress: boolean;
  error: any;
  lastUpdate: number;
  updateFrequencey: number;
  ids: number[];
  entities: Dict<PlayerProfile>;
  playerPosition: number;
}

export const initialState: RankingsState = {
  inProgress: false,
  lastUpdate: null,
  error: null,
  updateFrequencey: environment.rankingUpdateFrequency,
  ids: [],
  entities: {},
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
      const items = action.payload.rankings.reduce((result, item) => {
        result.ids.push(item.id);
        result.entities[item.id] = item;
        return result;
      }, { ids: [], entities: {} });
      return {
        ...state,
        ...items,
        inProgress: false,
        lastUpdate: Date.now(),
        rankings: action.payload.rankings,
        playerPosition: items.ids.indexOf(action.payload.playerId)
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

export const getAllRankings = (state: RankingsState) => state.ids.map((id) => state.entities[id]);
export const getRankingEntities = (state: RankingsState) => state.entities;
export const getPlayerPosition = ({ playerPosition }: RankingsState) => playerPosition;
export const getRankingsUpdate = ({ lastUpdate, updateFrequencey }: RankingsState) => ({ lastUpdate, updateFrequencey });
export const getRankingsProgress = (state: RankingsState) => state.inProgress;
