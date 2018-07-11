import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable ,  of } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import { map, withLatestFrom, filter, take } from 'rxjs/operators';
import { WorldData, MovementType, RecallPayload } from 'strat-ego-common';

import { Town } from './town.model';
import {
  TownActions,
  TownActionTypes,
  SetActiveTown,
  SetPlayerTowns,
  // UpdateEvent,
  Update,
  Rename,
  Recruit,
  // ScheduleUpdate,
  RenameSuccess,
  RenameFail,
  Build,
  BuildSuccess,
  BuildFail,
  RecruitSuccess,
  RecruitFail,
  MoveTroopsSuccess,
  MoveTroopsFail,
  MoveTroops,
  RecallSupport,
  SendBackSupport,
  RecallSupportSuccess,
  RecallSupportFail,
  SendBackSupportSuccess,
  SendBackSupportFail,
  IncomingMovement,
  SupportRecalled,
  SupportSentBack
} from './town.actions';
import { PlayerActionTypes, Update as PlayerUpdate } from '../player/player.actions';
import { GameModuleState, getActiveTown } from '../reducers';
import { SocketService } from '../../game/services/socket.service';
import { availableResources } from '../../game/utils';
import { getActiveWorld, State } from '../../reducers';

@Injectable()
export class TownEffects {
  // public townTimeouts = {};

  @Effect()
  public setActiveTown$: Observable<Action> = this.actions$.pipe(
    ofType<SetPlayerTowns>(TownActionTypes.SetPlayerTowns),
    map((action) => action.payload),
    withLatestFrom(this.store),
    filter(([towns, store]) => (towns.length && !store.game.town.activeTown) || !towns.length),
    map(([towns, store]) => new SetActiveTown(towns.length ? towns[0].id : null))
  );

  @Effect()
  public setPlayerTowns$: Observable<Action> = this.actions$.pipe(
    ofType<PlayerUpdate>(PlayerActionTypes.Update),
    map((action) => action.payload),
    map((player) => player.towns),
    withLatestFrom(this.store.select(getActiveWorld)),
    map(([towns, world]: [Town[], WorldData]) => new SetPlayerTowns(towns.map((town) => this.updateTown(world, town)))),
  );

  // @Effect()
  // public townUpdateEvent$: Observable<Action> = this.actions$.pipe(
  //   ofType<UpdateEvent>(TownActionTypes.UpdateEvent),
  //   map((action) => action.payload),
  //   withLatestFrom(this.store.select(getActiveWorld)),
  //   map(([{ town, event }, world]) => this.updateAction(world, [town], Update, event.type))
  // );

  @Effect({ dispatch: false })
  public changeTownName$: Observable<any> = this.actions$.pipe(
    ofType<Rename>(TownActionTypes.Rename),
    map((action) => action.payload),
    withLatestFrom(this.store.select(getActiveTown)),
    map(([name, town]) => this.socketService.sendEvent('town:rename', { name, town: town.id }))
  );

  @Effect({ dispatch: false })
  public build$: Observable<any> = this.actions$.pipe(
    ofType<Build>(TownActionTypes.Build),
    map((action) => action.payload),
    withLatestFrom(this.store.select(getActiveTown)),
    map(([{ building, level }, town]) => this.socketService.sendEvent('town:build', { building, level, town: town.id }))
  );

  @Effect({ dispatch: false })
  public recruit$: Observable<any> = this.actions$.pipe(
    ofType<Recruit>(TownActionTypes.Recruit),
    map((action) => action.payload),
    withLatestFrom(this.store.select(getActiveTown)),
    map(([units, town]) => this.socketService.sendEvent('town:recruit', { units, town: town.id }))
  );

  @Effect({ dispatch: false })
  public moveTroops$: Observable<any> = this.actions$.pipe(
    ofType<MoveTroops>(TownActionTypes.MoveTroops),
    map((action) => action.payload),
    withLatestFrom(this.store.select(getActiveTown)),
    map(([payload, town]) => this.socketService.sendEvent('town:moveTroops', { ...payload, town: town.id }))
  );

  @Effect({ dispatch: false })
  public recallSupport$: Observable<any> = this.actions$.pipe(
    ofType<RecallSupport>(TownActionTypes.RecallSupport),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('town:recallSupport', payload))
  );

  @Effect({ dispatch: false })
  public sendBackSupport$: Observable<any> = this.actions$.pipe(
    ofType<SendBackSupport>(TownActionTypes.SendBackSupport),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('town:sendBackSupport', payload))
  );


  // @Effect({ dispatch: false })
  // public scheduleUpdate$: Observable<any> = this.actions$.pipe(
  //   ofType<ScheduleUpdate>(TownActionTypes.ScheduleUpdate),
  //   map((action) => action.payload),
  //   map((id) => this.socketService.sendEvent('town:update', { town: id }))
  // );


  // public updateAction(world, towns: Town[], action, event?): TownActions {
  //   // towns.forEach((town) => this.scheduleUpdate(town));
  //   const townPayload = towns.map((town) => ({
  //     ...town,
  //     population: this.calculatePopulation(town, world.buildingMap.farm.data),
  //     storage: world.buildingMap.storage.data[town.buildings.storage.level].storage,
  //     recruitmentModifier: world.buildingMap.barracks.data[town.buildings.barracks.level].recruitment,
  //   }));
  //   return new action({
  //     event,
  //     towns: townPayload
  //   });
  // }

  public updateTown(world: WorldData, town: Town): Town {
    return {
      ...town,
      population: this.calculatePopulation(town, world.buildingMap.farm.data),
      storage: world.buildingMap.storage.data[town.buildings.storage.level].storage,
      recruitmentModifier: world.buildingMap.barracks.data[town.buildings.barracks.level].recruitment,
    };
  }

  public calculatePopulation(town: Town, farmData) {
    const total = farmData[town.buildings.farm.level].population;
    const supportPop = town.originSupport.reduce((result, { units }) => result + Object.values(units).reduce((a, b) => a + b, 0), 0);
    const attackPop = town.originMovements.reduce((result, { units }) => result + Object.values(units).reduce((a, b) => a + b, 0), 0);
    const returnPop = town.targetMovements.reduce((result, { units, type }) =>
      result + type === MovementType.return ?  Object.values(units).reduce((a, b) => a + b, 0) : 0, 0);
    const townPop = Object.entries(town.units).reduce((count, [name, unit]) => {
      return count + unit.inside + unit.queued;
      }, 0);
    const used = townPop + supportPop + attackPop + returnPop;
    return {
      total,
      used,
      available: total - used,
    };
  }

  // public scheduleUpdate(town: Town) {
  //   const soonest = this.findSoonestItem(town.buildingQueues, town.unitQueues/* , town.MovementDestinationTown, town.MovementOriginTown */);
  //   let townTimeout = this.townTimeouts[town.id];
  //   if (!soonest) {
  //     if (townTimeout) {
  //       clearTimeout(townTimeout.timeout);
  //     }
  //     return;
  //   }

  //   if (townTimeout) {
  //     clearTimeout(townTimeout.timeout);
  //   }
  //   const time = soonest - Date.now();
  //   townTimeout = {
  //     soonest,
  //     timeout: setTimeout((id) => this.callUpdate(id), time, town.id)
  //   };
  // }

  // public findSoonestItem(...queues) {
  //   return queues.reduce((soonest, queue) => {
  //     const queueSoonest = queue.reduce((qSoonest, item) => Math.min(qSoonest, new Date(item.endsAt).getTime()), Infinity);
  //     return Math.min(soonest, queueSoonest);
  //   }, Infinity) % Infinity;
  // }

  // public callUpdate(id) {
  //   this.store.dispatch(new ScheduleUpdate(id));
  // }

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<GameModuleState>,
    private socketService: SocketService,
  ) {
    this.socketService.registerEvents([
      ['town:update', (payload) =>
      this.store.select(getActiveWorld)
        .pipe(take(1))
        .subscribe((world) => this.store.dispatch(new Update(this.updateTown(world, payload))))
      ],
      ['town:renameSuccess', (payload) => this.store.dispatch(new RenameSuccess(payload))],
      ['town:renameFail', (payload) => this.store.dispatch(new RenameFail(payload))],
      [
        'town:buildSuccess',
        (payload) =>
          this.store.select(getActiveWorld)
            .pipe(take(1))
            .subscribe((world) => this.store.dispatch(new BuildSuccess(this.updateTown(world, payload))))
      ],
      ['town:buildFail', (payload) => this.store.dispatch(new BuildFail(payload))],
      [
        'town:recruitSuccess',
        (payload) =>
          this.store.select(getActiveWorld)
            .pipe(take(1))
            .subscribe((world) => this.store.dispatch(new RecruitSuccess(this.updateTown(world, payload))))
      ],
      ['town:recruitFail', (payload) => this.store.dispatch(new RecruitFail(payload))],
      [
        'town:moveTroopsSuccess',
        (payload) =>
          this.store.select(getActiveWorld)
            .pipe(take(1))
            .subscribe((world) => this.store.dispatch(new MoveTroopsSuccess(this.updateTown(world, payload))))
      ],
      ['town:moveTroopsFail', (payload) => this.store.dispatch(new MoveTroopsFail(payload))],
      ['town:recallSupportSuccess', (payload) => this.store.dispatch(new RecallSupportSuccess(payload))],
      ['town:recallSupportFail', (payload) => this.store.dispatch(new RecallSupportFail(payload))],
      ['town:sendBackSupportSuccess', (payload) => this.store.dispatch(new SendBackSupportSuccess(payload))],
      ['town:sendBackSupportFail', (payload) => this.store.dispatch(new SendBackSupportFail(payload))],
      ['town:incomingMovement', (payload) => this.store.dispatch(new IncomingMovement(payload))],
      ['town:supportRecalled', (payload) => this.store.dispatch(new SupportRecalled(payload))],
      ['town:supportSentBack', (payload) => this.store.dispatch(new SupportSentBack(payload))],
    ]);
  }
}
