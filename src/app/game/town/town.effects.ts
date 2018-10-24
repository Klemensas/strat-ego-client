import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import { map, withLatestFrom, filter, take } from 'rxjs/operators';
import { WorldData, MovementType } from 'strat-ego-common';

import { Town } from './town.model';
import {
  TownActionTypes,
  SetActiveTown,
  Rename,
  Recruit,
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
  SupportSentBack,
  Lost,
  Conquered,
  SupportDisbanded,
  SentSupportDestroyed,
  SentSupportUpdated,
  MovementDisbanded,
  Initialize,
  LoadProfilesSuccess
} from './town.actions';

import { Update as UpdateMap } from '../map/map.actions';
import { PlayerActionTypes, Update as PlayerUpdate } from '../player/player.actions';
import { GameModuleState, getActiveTown, getTownState } from '../reducers';
import { SocketService } from '../../game/services/socket.service';
import { getActiveWorld } from '../../reducers';
import { MapActionTypes } from '../map/map.actions';
import { TownService } from './town.service';

@Injectable()
export class TownEffects {
  @Effect()
  public setActiveTown$: Observable<Action> = this.actions$.pipe(
    ofType<Initialize>(TownActionTypes.Initialize),
    map((action) => action.payload),
    withLatestFrom(this.store.select(getTownState)),
    filter(([towns, townState]) => towns.length && !townState.activeTown),
    map(([towns]) => new SetActiveTown(towns[0].id))
  );

  @Effect()
  );

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

  // Loads missing map profiles
  @Effect({ dispatch: false })
  public loadMissingProfiles$: Observable<any> = this.actions$.pipe(
    ofType<UpdateMap>(MapActionTypes.Update),
    withLatestFrom(this.store.select(getTownState)),
    map(([action, townState]) => Object.values(action.payload).filter((id) => !townState.entities[id] && !townState.playerTowns[id])),
    filter((missingProfiles) => !!missingProfiles.length),
    map((payload) => this.socketService.sendEvent('profile:loadTowns', payload))
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
      population: TownService.calculatePopulation(town, world.buildingMap.farm.data),
      storage: world.buildingMap.storage.data[town.buildings.storage.level].storage,
      recruitmentModifier: world.buildingMap.barracks.data[town.buildings.barracks.level].recruitment,
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
      ['initialize', (payload) => this.store.dispatch(new Initialize(payload.towns))],
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
      ['town:lost', (payload) => this.store.dispatch(new Lost(payload))],
      ['town:supportDisbanded', (payload) => this.store.dispatch(new SupportDisbanded(payload))],
      ['town:sentSupportDestroyed', (payload) => this.store.dispatch(new SentSupportDestroyed(payload))],
      ['town:sentSupportUpdated', (payload) => this.store.dispatch(new SentSupportUpdated(payload))],
      ['town:movementDisbanded', (payload) => this.store.dispatch(new MovementDisbanded(payload))],
      ['town:conquered', (payload) =>
        this.store.select(getActiveWorld)
        .pipe(take(1))
        .subscribe((world) => this.store.dispatch(new Conquered(this.updateTown(world, payload))))
      ],

      ['profile:loadTownsSuccess', (payload) => this.store.dispatch(new LoadProfilesSuccess(payload)) ]
    ]);
  }
}
