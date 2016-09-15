import { Component, OnInit } from '@angular/core';

// import { ResourcesComponent } from '../resources';

import { PlayerService } from '../services/player.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'restaurant',
  templateUrl: 'restaurant.component.html',
  styleUrls: ['restaurant.component.scss'],
  inputs: ['restData'],
})

export class RestaurantComponent implements OnInit {
  restaurant = null;

  constructor(private playerService: PlayerService, private socket: SocketService) {
  }

  ngOnInit() {
    this.playerService.activeRest.subscribe(event => {
      this.restaurant = event;
    });
  }

  manageResources(res) {
    // Object.keys(res).forEach(r => {
    //   this.resources[r] = ++res[r];
    // });

    // setTimeout(() => this.manageResources(res), 1000);
  }

}
