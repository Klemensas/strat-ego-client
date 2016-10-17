import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { PlayerService } from './player.service';

@Injectable()
export class MapService {
  private currentMapData = {};
  private lastUpdate = null;

  // public mapData = new BehaviorSubject({});

  constructor(private socket: SocketService, private playerService: PlayerService) {
    this.listenForMapUpdates();
  }

  listenForMapUpdates() {
    this.socket.events.get('map').subscribe(event => {
      console.log("SOCKET MAP EVENT", event)
    });
  }

  public getMapData() {
    this.socket.sendEvent('map', {})
    // return this.mapData;
  }

}
