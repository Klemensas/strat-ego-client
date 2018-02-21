import { environment } from '../../environments/environment';
import * as player from './player/player.reducer';
import * as town from './town/town.reducer';
import * as alliance from './alliance/alliance.reducer';
import * as chat from './chat/chat.reducer';
import * as map from './map/map.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
// import * as auth from './auth';
// import * as world from './world';
// import * as player from './player';
// import * as town from './town';
// import * as map from './map';

export interface State {
  player: player.PlayerState;
  alliance: alliance.AllianceState;
  town: town.TownState;
  chat: chat.ChatState;
  map: map.MapState;
}

export interface GameModuleState {
  game: State;
}

export const reducers = {
  player: player.reducer,
  alliance: alliance.reducer,
  chat: chat.reducer,
  town: town.reducer,
  map: map.reducer,
};

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

// Alliance selectors
export const getAllianceState = createSelector(
  getState,
  (state: State) => state.alliance
);
export const getPlayerAlliance = createSelector(
  getAllianceState,
  alliance.getPlayerAlliance
);
export const getPlayerInvitations = createSelector(
  getAllianceState,
  alliance.getPlayerInvitations
);
export const getPlayerAllianceData = createSelector(
  getAllianceState,
  alliance.getPlayerAllianceData
);

// Chat selectors
export const getChatState = createSelector(
  getState,
  (state: State) => state.chat
);
export const getChatMessages = createSelector(
  getChatState,
  chat.getChatMessages
);

// Map selectors
export const getMapState = createSelector(
  getState,
  (state: State) => state.map
);
export const getMapData = createSelector(
  getMapState,
  map.getMapData
);

