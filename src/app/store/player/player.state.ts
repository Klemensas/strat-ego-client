import { Player } from './player.model';

export interface PlayerState {
  inProgress: boolean;
  activeTown: number;
  playerData: Player;
}

export const initialPlayerState: PlayerState = {
  inProgress: false,
  activeTown: null,
  playerData: null
};
