import { WorldData } from './world.model';

export interface WorldState {
  worlds: WorldData[];
  activeWorld: string;
}

export const initialWorldState = {
  worlds: [],
  activeWorld: null,
};
