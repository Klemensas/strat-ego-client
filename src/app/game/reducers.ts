import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as playerReducer from './player/player.reducer';
import * as townReducer from './town/town.reducer';
import * as allianceReducer from './alliance/alliance.reducer';
import * as chatReducer from './chat/chat.reducer';
import * as mapReducer from './map/map.reducer';
import * as rankingReducer from '../game/rankings/rankings.reducer';
import * as reportReducer from '../game/report/report.reducer';
import * as menuReducer from '../game/menu/menu.reducer';
import * as messageReducer from './message/message.reducer';
import { getActiveWorld } from '../reducers';
import { FullTown, TownService } from './town/town.service';
import { CombatOutcome } from 'strat-ego-common';

export interface State {
  player: playerReducer.PlayerState;
  alliance: allianceReducer.AllianceState;
  town: townReducer.TownState;
  chat: chatReducer.ChatState;
  map: mapReducer.MapState;
  rankings: rankingReducer.RankingsState;
  report: reportReducer.ReportState;
  menu: menuReducer.MenuState;
  message: messageReducer.MessageState;
}

export interface GameModuleState {
  game: State;
}

export const reducers = {
  player: playerReducer.reducer,
  alliance: allianceReducer.reducer,
  chat: chatReducer.reducer,
  town: townReducer.reducer,
  map: mapReducer.reducer,
  rankings: rankingReducer.reducer,
  report: reportReducer.reducer,
  menu: menuReducer.reducer,
  message: messageReducer.reducer,
};

export const getState = createFeatureSelector<State>('game');

// Town selectors
export const getTownState = createSelector(
  getState,
  (state: State) => state.town,
);
export const getActiveTown = createSelector(
  getTownState,
  townReducer.getActiveTown,
);
export const getPlayerTownList = createSelector(
  getTownState,
  townReducer.getPlayerTownList,
);
export const getTownIds = createSelector(
  getTownState,
  townReducer.getTownIds,
);
export const getTownEntities = createSelector(
  getTownState,
  townReducer.getEntities,
);
export const getPlayerTowns = createSelector(
  getTownState,
  townReducer.getPlayerTowns,
);

// Player selectors
export const getPlayerState = createSelector(
  getState,
  (state: State) => state.player,
);
export const getPlayerEntities = createSelector(
  getPlayerState,
  playerReducer.getEntities,
);
export const getCurrentPlayer = createSelector(
  getPlayerState,
  playerReducer.getCurrentPlayer,
);
export const getPlayerId = createSelector(
  getPlayerState,
  playerReducer.getPlayerId,
);
export const getPlayers = createSelector(
  getPlayerState,
  playerReducer.getPlayers,
);
export const getTutorialStage = createSelector(
  getPlayerState,
  playerReducer.getTutorialStage,
);
export const getViewedPlayer = createSelector(
  getPlayerState,
  playerReducer.getViewedPlayer,
);

// Alliance selectors
export const getAllianceState = createSelector(
  getState,
  (state: State) => state.alliance,
);
export const getPlayerAlliance = createSelector(
  getAllianceState,
  allianceReducer.getPlayerAlliance,
);
export const getPlayerInvitations = createSelector(
  getAllianceState,
  allianceReducer.getPlayerInvitations,
);
export const getPlayerAllianceData = createSelector(
  getAllianceState,
  allianceReducer.getPlayerAllianceData,
);
export const getViewedAlliance = createSelector(
  getAllianceState,
  allianceReducer.getViewedAlliance,
);
export const getAlliances = createSelector(
  getAllianceState,
  allianceReducer.getAlliances,
);
export const getAllianceEntities = createSelector(
  getAllianceState,
  allianceReducer.getAllianceEntities,
);

// Chat selectors
export const getChatState = createSelector(
  getState,
  (state: State) => state.chat,
);
export const getChatMessages = createSelector(
  getChatState,
  chatReducer.getChatMessages,
);

// Map selectors
export const getMapState = createSelector(
  getState,
  (state: State) => state.map,
);
export const getMapData = createSelector(
  getMapState,
  mapReducer.getMapData,
);

// Rankings selectors
export const getRankingsState = createSelector(
  getState,
  (state: State) => state.rankings,
);
export const getRankingIds = createSelector(
  getRankingsState,
  rankingReducer.getRankingIds,
);
export const getAllRankings = createSelector(
  getState,
  (state: State) => state.rankings.ids.map((id) => state.player.entities[id]),
);
export const getPlayerPosition = createSelector(
  getRankingsState,
  rankingReducer.getPlayerPosition,
);
export const getRankingsUpdate = createSelector(
  getRankingsState,
  rankingReducer.getRankingsUpdate,
);
export const getRankingsProgress = createSelector(
  getRankingsState,
  rankingReducer.getRankingsProgress,
);

// Report selectors
export const getReportState = createSelector(
  getState,
  (state: State) => state.report,
);
export const getReportList = createSelector(
  getReportState,
  reportReducer.getReportList,
);

// Menu selectors
export const getMenuState = createSelector(
  getState,
  (state: State) => state.menu,
);
export const getSidenavs = createSelector(
  getMenuState,
  menuReducer.getSidenavs,
);

// Message selectors
export const getMessageState = createSelector(
  getState,
  (state: State) => state.message,
);
export const getList = createSelector(
  getMessageState,
  messageReducer.getList,
);
export const getPageList = createSelector(
  getMessageState,
  messageReducer.getPageList,
);

// Multi state composed selectors
export const getFullViewedPlayer = createSelector(
  getViewedPlayer,
  getTownEntities,
  getAllianceEntities,
  (viewedPlayer, townEntities, allianceEntities) => viewedPlayer ? ({
    ...viewedPlayer,
    towns: viewedPlayer.towns.map(({ id }) => townEntities[id]),
    alliance: allianceEntities[viewedPlayer.allianceId] || null,
  }) : null
);

export const getFullViewedAlliance = createSelector(
  getViewedAlliance,
  getPlayerEntities,
  (viewedAlliance, playerEntities) => viewedAlliance ? ({
    ...viewedAlliance,
    members: viewedAlliance.members.map(({ id }) => playerEntities[id])
  }) : null
);

export const getFullTown = createSelector(
  getActiveTown,
  getActiveWorld,
  getTownEntities,
  (town, worldData, townEntities) => {
    if (!town) { return null; }
    const fullTown: FullTown = {
      ...town,
      canRecruit: !!town.buildings.barracks.level,
      storage:  worldData.buildingMap.storage.data[town.buildings.storage.level].storage,
      recruitmentModifier: worldData.buildingMap.barracks.data[town.buildings.barracks.level].recruitment,

      // TODO: consider separating these and fill as needed
      originMovements: town.originMovements.map((movement) => ({
        ...movement,
        originTown: townEntities[movement.originTownId] || {},
        targetTown: townEntities[movement.targetTownId] || {},
      })),
      targetMovements: town.targetMovements.map((movement) => ({
        ...movement,
        originTown: townEntities[movement.originTownId] || {},
        targetTown: townEntities[movement.targetTownId] || {},
      })),
      originSupport: town.originSupport.map((support) => ({
        ...support,
        originTown: townEntities[support.originTownId] || {},
        targetTown: townEntities[support.targetTownId] || {},
      })),
      targetSupport: town.targetSupport.map((support) => ({
        ...support,
        originTown: townEntities[support.originTownId] || {},
        targetTown: townEntities[support.targetTownId] || {},
      })),
    };
    fullTown.population = TownService.calculatePopulation(fullTown, worldData.buildingMap.farm.data, worldData.unitMap);
    return fullTown;
  },
);

export const getFullChatMessages = createSelector(
  getChatMessages,
  getPlayerEntities,
  (messages, playerEntities) => messages.map((message) => ({
    ...message,
    player: playerEntities[message.playerId],
  }))
);

export const getFullReports = createSelector(
  getReportList,
  getPlayerEntities,
  getTownEntities,
  getPlayerId,
  (reports, playerEntities, townEntities, playerId) => reports.map((report) => {
    const type = report.originPlayerId === playerId ? CombatOutcome.attack : CombatOutcome.defense;
    return {
      ...report,
      type,
      won: report.outcome === type,
      originTown: townEntities[report.originTownId] || {},
      targetTown: townEntities[report.targetTownId] || {},
      originPlayer: playerEntities[report.originPlayerId] || {},
      targetPlayer: playerEntities[report.targetPlayerId] || {},
    };
  })
);
