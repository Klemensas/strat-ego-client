import { WorldData } from 'strat-ego-common';

import { WorldActions, WorldActionTypes } from './world.actions';

export interface WorldState {
  worlds: WorldData[];
  activeWorld: string;
  error: any;
}

export const initialState = {
  worlds: [],
  activeWorld: null,
  error: null,
};


export function reducer(
  state = initialState,
  action: WorldActions
): WorldState {
  switch (action.type) {
    case WorldActionTypes.Loadsuccess:
      return { ...state, worlds: [...state.worlds, ...action.payload] };

      case WorldActionTypes.SelectWorld:
      return { ...state, activeWorld: action.payload };

    case WorldActionTypes.LoadFail:
      return { ...state, error: action.payload };

    case WorldActionTypes.Load:
    default: {
      return state;
    }
  }
}

export const getWorlds = (state: WorldState) => state.worlds;
export const getWorldError = (state: WorldState) => state.error;
export const getActiveWorld = (state: WorldState) => state.worlds.find(({ world }) =>
  world.name === state.activeWorld);
