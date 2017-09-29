import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';

import { TownActions, getActiveTown, Town } from './';
import { PlayerActions } from '../player';
import { StoreState } from '../';
import { SocketService } from '../../game/services';
import { getActiveWorld, WorldData } from '../world';

@Injectable()
export class TownEffects {
  public townTimeouts = {};

  @Effect()
  public setActiveTown$: Observable<Action> = this.actions$
    .ofType(TownActions.SET_PLAYER_TOWNS)
    .map(toPayload)
    .withLatestFrom(this.store)
    .filter(([towns, store]: [Action, StoreState]) => !store.town.activeTown)
    .map(([{ towns }, store]) => ({
      type: TownActions.SET_ACTIVE_TOWN,
      payload: towns[0]._id
    }));

  @Effect()
  public setPlayerTowns$: Observable<Action> = this.actions$
    .ofType(PlayerActions.UPDATE)
    .map(toPayload)
    .map((player) => player.Towns)
    .withLatestFrom(this.store.select(getActiveWorld))
    .map(([towns, world]: [Town, WorldData]) => this.updateAction(world, towns, TownActions.SET_PLAYER_TOWNS))

  @Effect()
  public townUpdateEvent$: Observable<Action> = this.actions$
    .ofType(TownActions.UPDATE_EVENT)
    .map(toPayload)
    .withLatestFrom(this.store.select(getActiveWorld))
    .map(([{ town, event }, world]) => this.updateAction(world, [town], TownActions.UPDATE, event.type));

  @Effect({ dispatch: false })
  public changeTownName$: Observable<any> = this.actions$
    .ofType(TownActions.CHANGE_NAME)
    .map(toPayload)
    .withLatestFrom(this.store.select(getActiveTown))
    .map(([name, town]) => this.socketService.sendEvent('town:name', { name, town: town._id }))

  @Effect({ dispatch: false })
  public upgradeBuilding$: Observable<any> = this.actions$
    .ofType(TownActions.UPGRADE_BUILDING)
    .map(toPayload)
    .withLatestFrom(this.store.select(getActiveTown))
    .map(([{ building, level }, town]) => this.socketService.sendEvent('town:build', { building, level, town: town._id }))

  @Effect({ dispatch: false })
  public recruit$: Observable<any> = this.actions$
    .ofType(TownActions.RECRUIT)
    .map(toPayload)
    .withLatestFrom(this.store.select(getActiveTown))
    .map(([units, town]) => this.socketService.sendEvent('town:recruit', { units, town: town._id }))

  @Effect({ dispatch: false })
  public sendTroops$: Observable<any> = this.actions$
    .ofType(TownActions.SEND_TROOPS)
    .map(toPayload)
    .withLatestFrom(this.store.select(getActiveTown))
    .map(([payload, town]) => this.socketService.sendEvent('town:moveTroops', { ...payload, town: town._id }))


  @Effect({ dispatch: false })
  public scheduleUpdate$: Observable<any> = this.actions$
    .ofType(TownActions.SCHEDULE_UPDATE)
    .map(toPayload)
    .map((id) => this.socketService.sendEvent('town:update', { town: id }));

  public updateAction(world, towns, type, event?): Action {
    towns.forEach((town) => this.scheduleUpdate(town));
    const townPayload = towns.map((town) => ({
      ...town,
      population: this.calculatePopulation(town, world.buildingMap.farm.data),
      storage: world.buildingMap.storage.data[town.buildings.storage.level].storage,
      recruitmentModifier: world.buildingMap.barracks.data[town.buildings.barracks.level].recruitment
    }));
    return {
      type,
      payload: {
        event,
        towns: townPayload
      }
    };
  }

  public calculatePopulation(town, farmData) {
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

  public scheduleUpdate(town) {
    const soonest = this.findSoonestItem(town.BuildingQueues, town.UnitQueues);
    let townTimeout = this.townTimeouts[town._id];
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
      timeout: setTimeout((id) => this.callUpdate(id), time, town._id)
    };
  }

  public findSoonestItem(...queues) {
    return queues.reduce((soonest, queue) => {
      const queueSoonest = queue.reduce((qSoonest, item) => Math.min(qSoonest, new Date(item.endsAt).getTime()), Infinity);
      return Math.min(soonest, queueSoonest);
    }, Infinity) % Infinity;
  }

  public callUpdate(id) {
    console.info('calling update')
    this.store.dispatch({ type: TownActions.SCHEDULE_UPDATE, payload: id });
  }

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<StoreState>,
    private socketService: SocketService,
  ) {}
}
