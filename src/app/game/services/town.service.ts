import { Injectable } from '@angular/core';

import { SocketService } from './socket.service';

@Injectable()
export class TownService {
  public data = {};
  public activeTown = null;

  constructor(private socket: SocketService) {
    this.observeTown();
  }

  observeTown() {
    this.socket.events.town.subscribe(event => {
      this.data = event.data;

      console.log('data yo', this.data);
      // if (!this.activeRest && this.data.Restaurants.length === 1) {
      //   this.activeRest = this.data.Restaurants[0];
      // }
    })
  }

}
