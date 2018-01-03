import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as seedrandom from 'seedrandom';
import { Big } from 'big.js';

@Injectable()
export class MapService {
  public imagesLoaded = new BehaviorSubject(false);
  public mapTiles = {
    image: null,
    tiles: [
      [0, 0], [120, 0], [240, 0], [360, 0], [480, 0], [600, 0],
        [0, 140], [120, 140], [240, 140], /*[360, 140], [480, 140], [600, 140],*/
      // [0, 280], [120, 280], [240, 280], [360, 280], [480, 280], [600, 280],
      // [0, 420], [120, 420], [240, 420], [360, 420], [480, 420], [600, 420],
      // [0, 560], [120, 560], [240, 560], [360, 560], [480, 560], [600, 560],
      // [0, 700], [120, 700], [240, 700], [360, 700], [480, 700], [600, 700],
      // [0, 840], [120, 840], [240, 840], [360, 840], [480, 840], [600, 840],
      // [0, 980], [120, 980], [240, 980], [360, 980], [480, 980], [600, 980],
      // [0, 1120], [120, 1120], [240, 1120], [360, 1120], [480, 1120], [600, 1120],
      // [0, 1260], [120, 1260], [240, 1260], [360, 1260], [480, 1260], [600, 1260],
    ],
    object: [360, 140],
    objectType: {
      abandoned: [480, 140],
      ownedActive: [600, 140],
      owned: [0, 280],
    },
    size: [120, 140]
  };
  // public mapData = {};

  // public queuedPromise = [];
  // private lastUpdate = null;

  private mapImgeLoc = './assets/images/tiles_small.png';

  constructor(private socket: SocketService) {
    this.imgPreload(this.mapImgeLoc);
    // Test version with all available map data
    // this.socket.events.get('map').subscribe(event => {
    //   this.lastUpdate = Date.now();
    //   Object.assign(this.mapData, event);
    //   if (this.queuedPromise.length && this.imagesLoaded) {
    //     this.formatMapData(this.queuedPromise.shift());
    //   }
    // });
  }

  public rng(seed) {
    // TODO: use actual active world here
    return seedrandom.xor4096(`megapolis.${seed}`).quick();
  }

  private imgPreload(imageURL) {
    this.mapTiles.image = new Image();
    this.mapTiles.image.src = imageURL;
    this.mapTiles.image.onload = () => this.imagesLoaded.next(true);
  }

  // public getMapData(coords) {
  //   return new Promise((resolve, reject) => {
  //     if (this.lastUpdate) {
  //       return this.formatMapData(resolve);
  //     }
  //     this.queuedPromise.push(resolve);
  //     this.socket.sendEvent('map', {});
  //   });
  // }

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


  public pixelToCoord(pos, settings, adjust = false) {
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
    if (adjust && realOffset.y.gt(-settings.hexHeight)) {
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
    // console.log(+coords.x, +coords.y)
    return {
      xCoord: coords.x,
      yCoord: coords.y,
      x: realOffset.x,
      y: realOffset.y,
      xPx: pos.x,
      yPx: pos.y
    };

    function odd(coords) { // A
      const offsetGradient = offset.x.times(settings.edgeGradient);
      if (offset.y.lt(settings.hexHeight.minus(offsetGradient))) {
        coords.x = coords.x.minus(1);
        coords.y = coords.y.minus(1);
      }
      if (offset.y.lt(settings.hexHeight.times(-1).plus(offsetGradient))) {
        coords.y = coords.y.minus(1);
      }
      return coords;
    }

    function even(coords) { // B
      const offsetGradient = offset.x.times(settings.edgeGradient);
      // console.log('b', +offset.x, +offset.y, +offsetGradient, +settings.side.minus(offsetGradient));
      if (offset.x.gte(settings.radius)) {
        if (offset.y.lt(settings.side.minus(offsetGradient))) {
        // if (offset.y.lt(settings.side.minus(offset.x).times(settings.edgeGradient))) {
          coords.y = coords.y.minus(1);
        }
        return coords;
      }

      if (offset.y.lt(offsetGradient)) {
        coords.y = coords.y.minus(1);
      } else {
        coords.x = coords.x.minus(1);
      }
      return coords;
    }
  }

  public offsetToCube(coords) {
    const off = 1;
    const x = coords.x - Math.trunc((coords.y + off * (coords.y % 2)) / 2);
    const z = coords.y;
    return {
      x, z,
      y: -x - z
    };
  }

  public distanceFromCoord(start, end) {
    const startCube = this.offsetToCube(start);
    const endCube = this.offsetToCube(end);
    return Math.max(
      Math.abs(startCube.x - endCube.x),
      Math.abs(startCube.y - endCube.y),
      Math.abs(startCube.z - endCube.z)
    );
  }
}
