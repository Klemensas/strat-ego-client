import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SocketService } from './socket.service';

import { PlayerEvent } from '../models/player';

@Injectable()
export class PlayerService {
  public data: PlayerEvent;
  public activeRest = new BehaviorSubject({});

  private hasActiveRest = false;

  constructor(private socket: SocketService) {
    this.observePlayer();
    console.log('init ps')
  }

  observePlayer() {
    this.socket.events.player.subscribe(event => {
      this.data = event.data;
      console.log('player service', event)
      if (!this.hasActiveRest) {
        this.setActiveRest(0);
      }
    })
  }

  setActiveRest(id) {
    this.activeRest.next(this.data.Restaurants[id]);
    this.hasActiveRest = true;
  }

}
