import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as seedrandom from 'seedrandom';
import { Coords } from 'strat-ego-common';

export interface Point {
  x: number;
  y: number;
}

export class Hex {
  constructor(public x: number, public y: number, public z: number) {}

  round() {
    let xi = Math.round(this.x);
    let yi = Math.round(this.y);
    let zi = Math.round(this.z);
    const xDiff = Math.abs(xi - this.x);
    const yDiff = Math.abs(yi - this.y);
    const zDiff = Math.abs(zi - this.z);
    if (xDiff > yDiff && xDiff > zDiff) {
      xi = -yi - zi;
    } else if (yDiff > zDiff) {
      yi = -xi - zi;
    } else {
      zi = -xi - yi;
    }
    return new Hex(xi, yi, zi);
  }
  distance(target: Hex) {
      return (Math.abs(this.x - target.x) + Math.abs(this.y - target.y) + Math.abs(this.z - target.z)) / 2;
  }
  toString() {
    return `${this.x},${this.y},${this.z}`;
  }
}
export class Layout {
  public orientation = {
    f0: Math.sqrt(3.0),
    f1: Math.sqrt(3.0) / 2,
    f2: 0,
    f3: 1.5,
    b0: Math.sqrt(3.0) / 3,
    b1: -1 / 3,
    b2: 0,
    b3: 2 / 3,
    startAngle: 0.5
  };

  constructor(
    public origin?: Point,
    public size?: Point,
    public centerCoord?: number,
  ) {}

  coordToHex(coord: Coords) {
    const offsetCoord = [
      coord[0] - this.centerCoord,
      coord[1] - this.centerCoord,
    ];
    const x = offsetCoord[0] - (offsetCoord[1] + (offsetCoord[1] & 1)) / 2;
    const y = offsetCoord[1];
    const z = -x - y;
    return new Hex(x, y, z);
  }

  coordToPixel(coord: Coords) {
    const hex = this.coordToHex(coord);
    return this.hexToPixel(hex);
  }

  hexToCoord(hex: Hex): Coords {
    return [hex.x + (hex.y + (hex.y & 1)) / 2 + this.centerCoord, hex.y + this.centerCoord];
  }

  hexToPixel(hex: Hex): Point {
    const x = (this.orientation.f0 * hex.x + this.orientation.f1 * hex.y) * this.size.x;
    const y = (this.orientation.f2 * hex.x + this.orientation.f3 * hex.y) * this.size.y;
    return {
      x: x + this.origin.x,
      y: y + this.origin.y
    };
  }

  pixelToHex(point: Point) {
    const pt: Point = {
      x: (point.x - this.origin.x) / this.size.x,
      y: (point.y - this.origin.y) / this.size.y
    };
    const x = this.orientation.b0 * pt.x + this.orientation.b1 * pt.y;
    const y = this.orientation.b2 * pt.x + this.orientation.b3 * pt.y;
    return new Hex(x, y, -x - y);
  }

  pixelToCoord(point: Point) {
    const hex = this.pixelToHex(point);
    return this.hexToCoord(hex.round());
  }

  hexCornerOffset(corner: number): Point {
    const angle = 2.0 * Math.PI * (this.orientation.startAngle - corner) / 6;
    return {
      x: this.size.x * Math.cos(angle),
      y: this.size.y * Math.sin(angle)
    };
  }

  polygonCorners(target: Hex | Point, mapOffset: Point = { x: 0, y: 0 }) {
    const corners: Point[] = [];
    const center = target instanceof Hex ? this.hexToPixel(target) : target;
    for (let i = 0; i < 6; i++) {
        const offset = this.hexCornerOffset(i);
        offset.x -= mapOffset.x;
        offset.y -= mapOffset.y;
        corners.push({
          x: center.x + offset.x,
          y: center.y + offset.y
        });
    }
    return corners;
  }
}

@Injectable()
export class MapService {
  public imagesLoaded = new BehaviorSubject(false);
  // TODO: use dynamic marker coloring, add markers for allies and naps
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
      member: [120, 280],
      war: [240, 280],
    },
    size: [120, 140]
  };
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
}
