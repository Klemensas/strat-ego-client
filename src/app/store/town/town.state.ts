import { Town } from './town.model';

export interface TownState {
  inProgress: boolean;
  activeTown: number;
  playerTowns: Town[];
}

export const initialTownState: TownState = {
  inProgress: false,
  activeTown: null,
  playerTowns: [],
};
