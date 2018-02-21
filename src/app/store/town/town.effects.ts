import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { map, withLatestFrom, filter } from 'rxjs/operators';

import { Town } from './town.model';
import {
  TownActions,
  TownActionTypes,
  SetActiveTown,
  SetPlayerTowns,
  UpdateEvent,
  Update,
  ChangeName,
  Recruit,
  SendTroops,
  ScheduleUpdate,
  UpgradeBuilding
} from './town.actions';
import { PlayerActionTypes, Update as PlayerUpdate } from '../player/player.actions';
import { GameModuleState, getActiveTown } from '../';
import { SocketService } from '../../game/services/socket.service';
import { availableResources } from '../../game/utils';
import { getActiveWorld, State } from '../../reducers';
import { WorldData } from '../../world/world.model';

@Injectable()
export class TownEffects {
  public townTimeouts = {};

  @Effect()
  public setActiveTown$: Observable<Action> = this.actions$.pipe(
    ofType<SetPlayerTowns>(TownActionTypes.SetPlayerTowns),
    map((action) => action.payload),
    withLatestFrom(this.store),
    filter(([{ towns }, store]) => (towns.length && !store.game.town.activeTown) || !towns.length),
    map(([{ towns }, store]) => new SetActiveTown(towns.length ? towns[0].id : null))
  );

  @Effect()
  public setPlayerTowns$: Observable<Action> = this.actions$.pipe(
    ofType<PlayerUpdate>(PlayerActionTypes.Update),
    map((action) => action.payload),
    map((player) => player.Towns),
    withLatestFrom(this.store.select(getActiveWorld)),
    map(([towns, world]: [Town[], WorldData]) => this.updateAction(world, towns, SetPlayerTowns))
  );

  @Effect()
  public townUpdateEvent$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateEvent>(TownActionTypes.UpdateEvent),
    map((action) => action.payload),
    withLatestFrom(this.store.select(getActiveWorld)),
    map(([{ town, event }, world]) => this.updateAction(world, [town], Update, event.type))
  );


  @Effect({ dispatch: false })
  public changeTownName$: Observable<any> = this.actions$.pipe(
    ofType<ChangeName>(TownActionTypes.ChangeName),
    map((action) => action.payload),
    withLatestFrom(this.store.select(getActiveTown)),
    map(([name, town]) => this.socketService.sendEvent('town:name', { name, town: town.id }))
  );

  @Effect({ dispatch: false })
  public upgradeBuilding$: Observable<any> = this.actions$.pipe(
    ofType<UpgradeBuilding>(TownActionTypes.UpgradeBuilding),
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
  public sendTroops$: Observable<any> = this.actions$.pipe(
    ofType<SendTroops>(TownActionTypes.SendTroops),
    map((action) => action.payload),
    withLatestFrom(this.store.select(getActiveTown)),
    map(([payload, town]) => this.socketService.sendEvent('town:moveTroops', { ...payload, town: town.id }))
  );


  @Effect({ dispatch: false })
  public scheduleUpdate$: Observable<any> = this.actions$.pipe(
    ofType<ScheduleUpdate>(TownActionTypes.ScheduleUpdate),
    map((action) => action.payload),
    map((id) => this.socketService.sendEvent('town:update', { town: id }))
  );


  public updateAction(world, towns: Town[], action, event?): TownActions {
    towns.forEach((town) => this.scheduleUpdate(town));
    const townPayload = towns.map((town) => {
      const fullTown = {
      ...town,
        population: this.calculatePopulation(town, world.buildingMap.farm.data),
        storage: world.buildingMap.storage.data[town.buildings.storage.level].storage,
        recruitmentModifier: world.buildingMap.barracks.data[town.buildings.barracks.level].recruitment,
      };
      fullTown.availableResources$ = availableResources(fullTown);
      return fullTown;
    });
    return new action({
      event,
      towns: townPayload
    });
  }

  public calculatePopulation(town: Town, farmData) {
    const total = farmData[town.buildings.farm.level].population;
    const used = Object.entries(town.units).reduce((count, [name, unit]) => {
      return count + unit.inside + unit.outside + unit.queued;
      }, 0);
    return {
      total,
      used,
      available: total - used,
    };
  }

  public scheduleUpdate(town: Town) {
    const soonest = this.findSoonestItem(town.BuildingQueues, town.UnitQueues, town.MovementDestinationTown, town.MovementOriginTown);
    let townTimeout = this.townTimeouts[town.id];
    if (!soonest) {
      if (townTimeout) {
        clearTimeout(townTimeout.timeout);
      }
      return;
    }

    if (townTimeout) {
      clearTimeout(townTimeout.timeout);
    }
    const time = soonest - Date.now();
    townTimeout = {
      soonest,
      timeout: setTimeout((id) => this.callUpdate(id), time, town.id)
    };
  }

  public findSoonestItem(...queues) {
    return queues.reduce((soonest, queue) => {
      const queueSoonest = queue.reduce((qSoonest, item) => Math.min(qSoonest, new Date(item.endsAt).getTime()), Infinity);
      return Math.min(soonest, queueSoonest);
    }, Infinity) % Infinity;
  }

  public callUpdate(id) {
    this.store.dispatch(new ScheduleUpdate(id));
  }

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<GameModuleState>,
    private socketService: SocketService,
  ) {
    this.socketService.registerEvents([
      ['town', (payload) => this.store.dispatch(new UpdateEvent(payload))]
    ]);
  }
}
