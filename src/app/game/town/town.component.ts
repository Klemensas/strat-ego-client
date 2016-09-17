import { Component, OnInit } from '@angular/core';

import { SocketService, PlayerService, TownService } from '../services';

@Component({
  selector: 'town',
  templateUrl: 'town.component.html',
  styleUrls: ['town.component.scss'],
  inputs: ['townData'],
})

export class TownComponent implements OnInit {
  private nameChange = '';
  public town = null;

  constructor(private socket: SocketService, private playerService: PlayerService, private townService: TownService) {
  }

  ngOnInit() {
    // Observes which town is active
    this.townService.data.subscribe(event => {
      this.town = event;
    });

    // this.townService.data.subscribe()
  }

  manageResources(res) {
    // Object.keys(res).forEach(r => {  
    //   this.resources[r] = ++res[r];
    // });

    // setTimeout(() => this.manageResources(res), 1000);
  }

  changeName() {
    if (this.nameChange.length > 3) {
      this.townService.changeName(this.nameChange);
    }
  }

}
