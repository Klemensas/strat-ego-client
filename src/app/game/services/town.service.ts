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

  public currentTown = new BehaviorSubject(<Town>null);


  constructor(private socket: SocketService, private playerService: PlayerService) {
    this.playerService.activeTown.subscribe((town: Town) => {
      if (town) {
        this.townData[town._id] = town;
        this.updateCurrent(town);
      }
    })
    this.observeTown();

    this.calculateRes();
  }

  observeTown() {
    this.socket.events.town.subscribe(event => {
      // Store town in townData for future use
      this.townData[event._id] = event;

      // Check if this is the currently active town
      if (this.currentTown.value._id === event._id) {
        this.updateCurrent(event);
      }
    })
  }

  updateCurrent(town) {
    this.currentTown.next(town);
    this.savedRes = Object.assign({}, town.resources);
    this.lastUpdate = new Date(town.updatedAt).getTime();
  };

  calculateRes() {
    if (this.currentTown.value) {
      const now = Date.now();
      const timePast = (now - this.lastUpdate) / (1000 * 60 * 60);
      this.currentTown.value.resources = {
        clay: this.savedRes.clay + this.currentTown.value.production.clay * timePast,
        wood: this.savedRes.wood + this.currentTown.value.production.wood * timePast,
        iron: this.savedRes.iron + this.currentTown.value.production.iron * timePast,
      };
    }
    setTimeout(() => this.calculateRes(), 1000);
  }

  changeName(name) {
    this.socket.sendEvent('town:name', { name, town: this.currentTown.value._id});
  }

  upgradeBuilding(target) {
    console.log(target);
    this.socket.sendEvent('town:build', {
      building: target.building,
      level: target.level,
      town: this.currentTown.value._id
    });
  }

}
