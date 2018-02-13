import { WorldActions, WorldActionTypes } from './world.actions';
import { WorldData } from './world.model';


export interface WorldState {
  worlds: WorldData[];
  activeWorld: string;
}

export const initialState = {
  worlds: [],
  activeWorld: null,
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

    case WorldActionTypes.Load:
    case WorldActionTypes.LoadFail:
    default: {
      return state;
    }
  }
}

export const getWorlds = (state: WorldState) => state.worlds;
export const getActiveWorld = (state: WorldState) => state.worlds.find(({ world }) =>
  world.name === state.activeWorld);
