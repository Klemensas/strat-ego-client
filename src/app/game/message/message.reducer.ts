import { PlayerProfile, Dict, Thread } from 'strat-ego-common';

import { MessageActions, MessageActionTypes } from './message.actions';
import { createSelector } from '@ngrx/store';

export interface MessageState {
  ids: number[];
  entities: Dict<Thread>;
  total: number;
  pageSize: number;
  inProgress: boolean;
  error: any;
}

export const initialState: MessageState = {
  ids: [],
  entities: {},
  total: null,
  pageSize: null,
  inProgress: false,
  error: null,
};

export function reducer(
  state = initialState,
  action: MessageActions
) {
  switch (action.type) {
    case MessageActionTypes.Initialize: {
      const { results, pageSize, total } = action.payload;
      const { ids, entities } = results.reduce((result, thread) => {
        result.ids.push(thread.id);
        result.entities[thread.id] = thread;
        return result;
      }, { ids: [], entities: {} });
      return {
        ...state,
        ids,
        entities,
        total,
        pageSize,
      };
    }
    case MessageActionTypes.Load: {
      return {
        ...state,
      };
    }

    case MessageActionTypes.LoadSuccess: {
      return {
        ...state,
        // ids: action.payload,
        // inProgress: false,
        // lastUpdate: Date.now(),
        // rankings: action.payload.rankings,
        // playerPosition: action.payload.rankings.indexOf(action.payload.playerId)
      };
    }

    case MessageActionTypes.Create: {
      return {
        ...state,
        inProgress: true,
        error: null,
      };
    }

    case MessageActionTypes.CreateSuccess: {
      return {
        ...state,
        inProgress: true,
        ids: state.ids.concat(action.payload.id),
        entities: { ...state.entities, [action.payload.id]: action.payload }
      };
    }

    case MessageActionTypes.LoadFail:
    case MessageActionTypes.Create: {
      return {
        ...state,
        inProgress: false,
        error: action.payload,
      };
    }

    case MessageActionTypes.ThreadReceived:
    default: {
      return state;
    }
  }
}

function mapEntityList(ids: number[], entitites: Dict<Thread>) {
  return ids.map((id) => entitites[id]);
}


export const getIds = (state: MessageState) => state.ids;
export const getEntities = (state: MessageState) => state.entities;
export const getpageSize = (state: MessageState) => state.pageSize;
export const getList = createSelector(
  getIds,
  getEntities,
  mapEntityList,
);

export const getPageIds = createSelector(
  getIds,
  getpageSize,
  (ids: number[], pageSize: number, page: number) => {
    const startIndex = pageSize * page;
    return ids.slice(startIndex, startIndex + pageSize);
  });

export const getPageList = createSelector(
  getPageIds,
  getEntities,
  mapEntityList,
);
