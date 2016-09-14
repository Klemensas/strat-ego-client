import { Component, OnInit } from '@angular/core';

import { ResourcesComponent } from '../resources';

import { PlayerService } from '../services/player.service';
import { SocketService } from '../services/socket.service';

@Component({
  moduleId: module.id,
  selector: 'restaurant',
  templateUrl: 'restaurant.component.html',
  styleUrls: ['restaurant.component.css'],
  inputs: ['restData'],
  directives: [ResourcesComponent]
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