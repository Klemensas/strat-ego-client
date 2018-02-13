import { environment } from '../../environments/environment';
import { MapState } from './map/map.state';
import * as player from './player/player.reducer';
import * as town from './town/town.reducer';
import { MapReducer } from './map/map.reducer';
import { PlayerActions } from './player/player.actions';
import { TownActions } from './town/town.actions';
import { MapActions } from './map/map.actions';
import { PlayerEffects } from './player/player.effects';
import { TownEffects } from './town/town.effects';
import { MapEffects } from './map/map.effects';
import { AllianceState } from './alliance/alliance.state';
import { AllianceReducer } from './alliance/alliance.reducer';
import { AllianceActions } from './alliance/alliance.actions';
import { Allianceffects } from './alliance/alliance.effects';
import { ChatState } from './chat/chat.state';
import { ChatReducer } from './chat/chat.reducer';
import { ChatActions } from './chat/chat.actions';
import { ChatEffects } from './chat/chat.effects';
import { createFeatureSelector, createSelector } from '@ngrx/store';
// import * as auth from './auth';
// import * as world from './world';
// import * as player from './player';
// import * as town from './town';
// import * as map from './map';

export interface State {
  player: player.PlayerState;
  alliance: AllianceState;
  chat: ChatState;
  town: town.TownState;
  map: MapState;
}

export interface GameModuleState {
  game: State;
}

export const reducers = {
  player: player.reducer,
  alliance: AllianceReducer,
  chat: ChatReducer,
  town: town.reducer,
  map: MapReducer,
};
export const actions = [
  AllianceActions,
  ChatActions,
  MapActions,
];
export const effects = [
  PlayerEffects,
  Allianceffects,
  ChatEffects,
  TownEffects,
  MapEffects,
];

export const getState = createFeatureSelector<State>('game');

// Town selectors
export const getTownState = createSelector(
  getState,
  (state: State) => state.town
);
export const getActiveTown = createSelector(
  getTownState,
  town.getActiveTown
);

// Player selectors
export const getPlayerState = createSelector(
  getState,
  (state: State) => state.player
);
export const getPlayerData = createSelector(
  getPlayerState,
  player.getPlayerData
);
export const getPlayerReports = createSelector(
  getPlayerState,
  player.getPlayerReports
);
export const getSidenavs = createSelector(
  getPlayerState,
  player.getSidenavs
);
