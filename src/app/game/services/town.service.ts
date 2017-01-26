import { Injectable } from '@angular/core';

import { SocketService } from './socket.service';
import { PlayerService } from './player.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Town } from '../models/Town';

@Injectable()
export class TownService {
  private townData = {};
  private lastUpdate: number;
  private savedRes = null;
  private hasCompleteQueue = false;
  private shouldCheckQueue = true;
  public currentTown = new BehaviorSubject(<Town>null);


  constructor(private socket: SocketService, private playerService: PlayerService) {
    this.playerService.activeTown.subscribe((town: Town) => {
      if (town) {
        this.townData[town._id] = town;
        this.updateCurrent(town);
      }
    });
    // CONSIDER: this never stops, should it?
    this.timeTick();
  }

  observeTown() {
    this.socket.events.get('town').subscribe(event => {
      console.log('[Socket receive town]', event)
      // Store town in townData for future use
      this.townData[event._id] = event;

      // Check if this is the currently active town
      if (this.currentTown.value._id === event._id) {
        this.shouldCheckQueue = true;
        this.hasCompleteQueue = false;
        this.updateCurrent(event);
      }
    });
    return this.currentTown;
  }

  updateCurrent(town) {
    this.savedRes = Object.assign({}, town.resources);
    this.lastUpdate = new Date(town.updatedAt).getTime();
    const time = Date.now();
    this.updateValues(town, time);
    this.currentTown.next(town);
  };

  timeTick() {
    const target = this.currentTown.value;
    if (target) {
      const now = Date.now();
      this.updateValues(target, now);

      if (this.hasCompleteQueue && this.shouldCheckQueue) {
        this.shouldCheckQueue = false;
        this.socket.sendEvent('town:update', {
            town: this.currentTown.value._id
        });
      }
    }
    setTimeout(() => this.timeTick(), 1000);
  }

  updateValues(town, time) {
      town.resources = this.updateResources(time, town.production)
      if (town.BuildingQueues && town.BuildingQueues.length) {
        town.BuildingQueues = this.updateBuildingQueue(time, town.BuildingQueues);
      };
  }  

  updateResources(time, production) {
      const timePast = (time - this.lastUpdate) / (1000 * 60 * 60);
      return {
        clay: this.savedRes.clay + production.clay * timePast,
        wood: this.savedRes.wood + production.wood * timePast,
        iron: this.savedRes.iron + production.iron * timePast,
      };
  }

  updateBuildingQueue(time, queue) {
      const timePast = (time - this.lastUpdate) / (1000 * 60 * 60);
      return queue.map(item => {
        const ends = new Date(item.endsAt).getTime();
        item.timeLeft = (ends - time) / 1000;
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
}
