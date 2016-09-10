import { Injectable } from '@angular/core';

import { SocketService } from '../../services/socket.service';

@Injectable()
export class RestaurantService {
  public data = {};
  public activeRest = null;

  constructor(private socket: SocketService) {
    this.observeRestaurant();
  }

  observeRestaurant() {
    this.socket.events.restaurant.subscribe(event => {
      this.data = event.data;

      console.log('data yo', this.data);
      // if (!this.activeRest && this.data.Restaurants.length === 1) {
      //   this.activeRest = this.data.Restaurants[0];
      // }
    })
  }

}
