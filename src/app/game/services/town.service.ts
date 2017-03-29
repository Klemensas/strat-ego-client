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
        this.updateCurrent(event);
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
      town.resources = this.updateResources(time, town.production)
      town.BuildingQueues = this.updateQueueTime(time, town.BuildingQueues);
      town.UnitQueues = this.updateQueueTime(time, town.UnitQueues);
      town.MovementOriginTown = this.updateMovementTime(time, town.MovementOriginTown);
      town.MovementDestinationTown = this.updateMovementTime(time, town.MovementDestinationTown);
  }

  updateResources(time, production) {
      const timePast = (time - this.lastUpdate) / (1000 * 60 * 60);
      return {
        clay: this.savedRes.clay + production.clay * timePast,
        wood: this.savedRes.wood + production.wood * timePast,
        iron: this.savedRes.iron + production.iron * timePast,
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
      return item;
    })
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

}
