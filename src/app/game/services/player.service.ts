import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SocketService } from './socket.service';

import { Player } from '../models/Player';

@Injectable()
export class PlayerService {
  public data: Player;
  public activeTown = new BehaviorSubject(null);

  private hasActiveTown = false;

  constructor(private socket: SocketService) {
  }

  observePlayer() {
    this.hasActiveTown = false;
    this.socket.events.get('player').subscribe(event => {
      this.data = event;
      // console.log('player service', event)
      if (!this.hasActiveTown) {
        this.setActiveTown(0);
      }
    })
  }

  setActiveTown(id) {
    this.activeTown.next(this.data.Towns[id]);
    this.hasActiveTown = true;
  }

}
