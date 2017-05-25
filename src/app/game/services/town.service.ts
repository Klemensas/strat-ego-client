import { Injectable } from '@angular/core';

import { GameDataService } from '../../services/game-data.service';
import { SocketService } from './socket.service';
import { PlayerService } from './player.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { Town } from '../models/Town';

@Injectable()
export class TownService {
  private townData = {};
  private lastUpdate: number;
  private savedRes = null;
  private hasCompleteQueue = false;
  private shouldCheckQueue = true;
  public currentTown = new BehaviorSubject(<Town>null);
  public townEvents = {
    build: new Subject(),
    recruit: new Subject(),
    name: new Subject(),
    movement: new Subject(),
    update: new Subject()
  };
  public worldData;

  constructor(private socket: SocketService, private playerService: PlayerService, private gameData: GameDataService) {
    this.playerService.activeTown.subscribe((town: Town) => {
      if (town) {
        console.log('iniy town', town)
        this.townData[town._id] = town;
        this.updateCurrent(town);
      }
    });
    this.gameData.data.activeWorld.subscribe((world) => {
      this.worldData = world;
    });
    // CONSIDER: this never stops, should it?
    this.timeTick();
  }

  observeTown() {
    this.socket.events.get('town').subscribe(({ event, town }) => {
      console.log('[Socket receive town]', event, Object.assign({}, town))
      // Store town in townData for future use
      this.townData[event._id] = town;

      // Check if this is the currently active town
      if (this.currentTown.value._id === town._id) {
        this.townEvents[event.type].next(true);
        this.updateCurrent(town);
      }
    });
    return this.currentTown;
  }

  updateCurrent(town) {
    town.BuildingQueues = town.BuildingQueues || [];
    town.BuildingQueues.sort((a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime()).forEach(item => {
      item.endsAt = new Date(item.endsAt).getTime();
    });
    town.UnitQueues.sort((a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime()).forEach(item => {
      item.endsAt = new Date(item.endsAt).getTime();
    });
    town.MovementOriginTown.sort((a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime()).forEach(item => {
      item.endsAt = new Date(item.endsAt).getTime();
    });
    town.MovementDestinationTown.sort((a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime()).forEach(item => {
      item.endsAt = new Date(item.endsAt).getTime();
    });
    town.population = this.calculateTownPopulation(town);
    town.storage = this.worldData.buildingMap.storage.data[town.buildings.storage.level].storage;
    town.recruitmentModifier = this.worldData.buildingMap.barracks.data[town.buildings.barracks.level].recruitment;

    this.shouldCheckQueue = true;
    this.hasCompleteQueue = false;
    this.savedRes = Object.assign({}, town.resources);
    this.lastUpdate = new Date(town.updatedAt).getTime();
    this.updateValues(town);
    this.currentTown.next(town);
  };

  timeTick() {
    const target = this.currentTown.value;
    if (target) {
      this.updateValues(target);

      if (this.hasCompleteQueue && this.shouldCheckQueue) {
        this.shouldCheckQueue = false;
        this.socket.sendEvent('town:update', {
            town: this.currentTown.value._id
        });
      }
    }
    setTimeout(() => this.timeTick(), 1000);
  }

  updateValues(town) {
    const time = Date.now();
    town.resources = this.updateResources(time, town.production, town.storage);
    town.BuildingQueues = this.updateQueueTime(time, town.BuildingQueues);
    town.UnitQueues = this.updateQueueTime(time, town.UnitQueues);
    town.MovementOriginTown = this.updateMovementTime(time, town.MovementOriginTown);
    town.MovementDestinationTown = this.updateMovementTime(time, town.MovementDestinationTown);
  }

  updateResources(time, production, storage) {
      const timePast = (time - this.lastUpdate) / (1000 * 60 * 60);
      const clay = this.savedRes.clay + production.clay * timePast;
      const wood = this.savedRes.wood + production.wood * timePast;
      const iron = this.savedRes.iron + production.iron * timePast;

      return {
        clay: clay < storage ? clay : storage,
        wood: wood < storage ? wood : storage,
        iron: iron < storage ? iron : storage,
      };
  }

  updateQueueTime(time, queue) {
      return queue.map(item => {
        item.timeLeft = item.endsAt - time;
        this.hasCompleteQueue = this.hasCompleteQueue || item.timeLeft <= 0;
        return item;
      });
  }

  updateMovementTime(time, movements) {
    return movements.map(item => {
      item.timeLeft = item.endsAt - time;
        this.hasCompleteQueue = this.hasCompleteQueue || item.timeLeft <= 0;
      return item;
    });
  }

  changeName(name) {
    this.socket.sendEvent('town:name', { name, town: this.currentTown.value._id});
  }

  upgradeBuilding(target) {
    this.socket.sendEvent('town:build', {
      building: target.building,
      level: target.level,
      town: this.currentTown.value._id
    });
  }

  recruit(units) {
    this.socket.sendEvent('town:recruit', {
      town: this.currentTown.value._id,
      units
    });
  }

  sendUnits(target, units, type) {
    this.socket.sendEvent('town:moveTroops', {
      town: this.currentTown.value._id,
      units,
      target,
      type
    });
  }

  calculateTownPopulation(town) {
    const farmPopulation = this.worldData.buildingMap.farm.data[town.buildings.farm.level].population;
    const usedPopulation = this.worldData.units.reduce((total, unit) => {
      const count = Object.values(town.units[unit.name]).reduce((a, b) => a + b);
      return total + count;
    }, 0);
    return {
      total: farmPopulation,
      used: usedPopulation,
      available: farmPopulation - usedPopulation,
    };
  }

}
