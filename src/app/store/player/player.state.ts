import { Player } from './player.model';

export interface PlayerState {
  inProgress: boolean;
  activeTown: number;
  playerData: Player;
  sidenavs: {
    left: string;
    right: string;
  };
}

export const initialPlayerState: PlayerState = {
  inProgress: false,
  activeTown: null,
  playerData: null,
  sidenavs: {
    left: null,
    right: null,
  }
};
