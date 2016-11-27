import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { PlayerService } from './player.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as seedrandom from 'seedrandom';
import * as Big from 'big.js';

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

  public rng(seed) {
    // TODO: use actual active world here
    return seedrandom.xor4096(`megapolis.${seed}`).quick();
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

  // Returns { x, y } pixels on the center of the coordinate
  public coordToPixel(location, settings) {
    const x = Big(location.x);
    const y = Big(location.y);
    const xOffset = y.mod(2).times(-0.5);
    return {
      x: xOffset.plus(x).times(settings.width),
      y: y.minus(0.25).times(settings.aHeight)
    };
  }


  public pixelToCoord(pos, settings) {
    let coords = {
      x: Big(pos.x).div(settings.width).plus(1).round(0, 0),
      y: Big(pos.y).div(settings.aHeight).plus(1).round(0, 0)
    };
    const offset = {
      x: Big(pos.x).mod(settings.width),
      y: Big(pos.y).mod(settings.aHeight),
    };
    const type = +coords.y % 2 ? odd : even;
    coords = type(coords);
    const coordOffset = this.coordToPixel(coords, settings);
    const realOffset = {
      x: coordOffset.x.minus(pos.x).minus(settings.radius),
      y: coordOffset.y.minus(pos.y).minus(settings.side),
    };
    // Adjust coord if near edge
    if (realOffset.y.gt(-settings.hexHeight)) {
      coords.y = coords.y.minus(1);
      const parity = +coords.y % 2;
      realOffset.y = realOffset.y.minus(settings.aHeight);
      if (realOffset.x.lte(settings.radius.times(-1))) {
        coords.x = parity ? coords.x.plus(1) : coords.x;
        realOffset.x = realOffset.x.plus(settings.radius);
      } else {
        coords.x = parity ? coords.x : coords.x.minus(1);
        realOffset.x = realOffset.x.minus(settings.radius);
      }
    }
    return {
      xCoord: coords.x,
      yCoord: coords.y,
      x: realOffset.x,
      y: realOffset.y,
      xPx: pos.x,
      yPx: pos.y
    }

    function odd(coords) {
      if (offset.y.lt(settings.hexHeight.minus(offset.x).times(settings.edgeGradient))) {
        coords.x = coords.x.minus(1);
        coords.y = coords.y.minus(1);
      }
      if (offset.y.lt(-settings.hexHeight.plus(offset.x).times(settings.edgeGradient))) {
        coords.y = coords.y.minus(1);
      }
      return coords;
    };

    function even(coords) {
      if (offset.x.gte(settings.radius)) {
        if (offset.y.lt(settings.side.minus(offset.x).times(settings.edgeGradient))) {
          coords.y = coords.y.minus(1);
        }
        return coords;
      }

      if (offset.y.lt(offset.x.times(settings.edgeGradient))) {
        coords.y = coords.y.minus(1);
      } else {
        coords.x = coords.x.minus(1);
      }
      return coords;
    }
  }
}
