import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { PlayerService } from './player.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as seedrandom from 'seedrandom';

@Injectable()
export class MapService {
  private currentMapData = {};
  private lastUpdate = null;

  private mapOffset = { x: 0, y: 0 };
  private mapCoords = { x: 0, y: 0 };

  private imagesLoaded = false;
  private mapImages = [
    '../../../../assets/images/grass.png',
    '../../../../assets/images/grass2.png',
    '../../../../assets/images/grass3.png',
    '../../../../assets/images/grass4.png',
    '../../../../assets/images/grass5.png',
    '../../../../assets/images/grass6.png',
    '../../../../assets/images/grass7.png',
    '../../../../assets/images/town.png',
  ];

  public images = [];
  public mapData = {};
  public queuedPromise = [];
  public rng = seedrandom('megapolis');

  constructor(private socket: SocketService, private playerService: PlayerService) {
    this.imgPreload(this.mapImages);
    // Test version with all available map data
    this.socket.events.get('map').subscribe(event => {
      this.lastUpdate = Date.now();
      Object.assign(this.mapData, event);
      if (this.queuedPromise.length && this.imagesLoaded) {
        const resolve = this.queuedPromise.shift()
        this.formatMapData(resolve);
      }
    });
  }

  private imgPreload(images) {
    let loaded = 0;
    images = Object.prototype.toString.apply(images) === '[object Array]' ? images : [images];
    const inc = (img) => {
      loaded += 1;
      if (loaded === images.length) {
        this.imagesLoaded = true;
        if (this.lastUpdate && this.queuedPromise.length) {
          const resolve = this.queuedPromise.shift();
          this.formatMapData(resolve);
        }
      }
    };
    for (let i = 0; i < images.length; i++) {
      this.images[i] = new Image();
      this.images[i].onabort = inc;
      this.images[i].onerror = inc;
      this.images[i].onload = inc;
      this.images[i].src = images[i];
    }
  }

  private formatMapData(callback) {
    callback(this.mapData);
  }

  public getMapData(coords) {
    return new Promise((resolve, reject) => {
      this.mapCoords = coords;
      this.queuedPromise.push(resolve);
      this.socket.sendEvent('map', {});
    });
  }
}
