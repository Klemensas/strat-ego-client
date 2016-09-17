import { Injectable } from '@angular/core';

import { SocketService } from './socket.service';
import { PlayerService } from './player.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Town } from '../models/Town';

@Injectable()
export class TownService {
  public data = new BehaviorSubject(<Town>{});

  constructor(private socket: SocketService, private playerService: PlayerService) {
    this.playerService.activeTown.subscribe((town: Town) => {
      this.data.next(town);
    })
    this.observeTown();
    this.calculateRes();
  }

  observeTown() {
    this.socket.events.town.subscribe(event => {
      this.data.next(event);
      console.log('ok?', event)
      // if (!this.activeRest && this.data.Restaurants.length === 1) {
      //   this.activeRest = this.data.Restaurants[0];
      // }
    })
  }

  calculateRes() {
    if (this.data.value['resources']) {
      const now = Date.now();
      const time = new Date(this.data.value['updatedAt']).getTime();
      const timePast = (now - time) / 1000 / 60;
      const res = this.data.value['resources'];

      res.clay += Math.floor(timePast);
      res.wood += Math.floor(timePast);
      res.iron += Math.floor(timePast);
    }
    setTimeout(() => this.calculateRes(), 1000);
  }

  changeName(name) {
    this.socket.changeTownName(this.data.value._id, name)
  }

}
