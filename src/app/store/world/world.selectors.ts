import { createSelector } from 'reselect';

import { WorldState } from './world.state';
import { StoreState } from '../';

export const getWorlds = (state: StoreState) => state.world.worlds;
export const getWorld = (name: string) => (state: StoreState) =>
  state.world.worlds.find(({ world }) => world.name.toLowerCase() === name);
export const getActiveWorld = (state: StoreState) => state.world.worlds.find(({ world }) =>
  world.name === state.world.activeWorld);
