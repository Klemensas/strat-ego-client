import { Component, OnInit } from '@angular/core';

// import { ResourcesComponent } from '../resources';

import { PlayerService } from '../services/player.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'town',
  templateUrl: 'town.component.html',
  styleUrls: ['town.component.scss'],
  inputs: ['townData'],
})

export class TownComponent implements OnInit {
  town = null;

  constructor(private playerService: PlayerService, private socket: SocketService) {
  }

  ngOnInit() {
    console.log('watt')
    this.playerService.activeTown.subscribe(event => {
      this.town = event;
    });
  }

  manageResources(res) {
    // Object.keys(res).forEach(r => {
    //   this.resources[r] = ++res[r];
    // });

    // setTimeout(() => this.manageResources(res), 1000);
  }

}
