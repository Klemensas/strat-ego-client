import { Component, OnInit, ElementRef, Renderer, ViewChild } from '@angular/core';
import { MapService, PlayerService } from '../services';
import * as Konva from 'konva';
import * as seedrandom from 'seedrandom';

@Component({
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.scss'],
})
export class MapComponent implements OnInit {
  private stage;
  private layer;

  private mapSettings:any = {};
  private images;

  private mapData;
  private mapOffset;
  private isReady = false;

  @ViewChild('map') map;

  constructor(private mapService: MapService, private playerService: PlayerService) {
    this.images = mapService.images;
  }

  ngOnInit() {
    this.mapSettings.size = [
      this.map.nativeElement.offsetWidth,
      this.map.nativeElement.offsetHeight,
    ]
    this.stage = new Konva.Stage({
      container: this.map.nativeElement,
      width: this.mapSettings.size[0],
      height: this.mapSettings.size[1],
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    // TODO: replace arbitrary 80 with a normal number, calculate from screen size?
    this.initMap(this.mapSettings.size[0]/17);

    this.playerService.activeTown.subscribe(data => {
        if (!data) {
          console.error('No active town?', data, this.playerService);
          return;
        }
        const location = { x: data.location[0], y: data.location[1] };
        this.mapService.getMapData(location).then(mapData => {
          this.drawMap(this.pixelsToHex(this.coordsToPixels(location)), mapData);
          // console.log('weird?!!', this.pixelsToHex({x: 0, y: 0 }, this.mapSettings.width, this.mapSettings.height));
        });
    });
  }

  onResize(event) {
    this.mapSettings.size = [
      event.target.innerWidth,
      event.target.innerHeight
    ];
    this.stage.draw();
    // this.initMap(size, { x: 0, y: 0 });
  }

  initMap(width) {
    this.mapSettings.width = Math.floor(width);
    this.mapSettings.side = this.mapSettings.width / Math.sqrt(3);
    this.mapSettings.height = Math.floor(2 * this.mapSettings.side);
    this.mapSettings.radius = this.mapSettings.width / 2;
    this.mapSettings.aHeight = this.mapSettings.height * 0.75;
    this.mapSettings.hexHeight = this.mapSettings.side / 2;
    // this.mapSettings.points = [
    //   { x: this.mapSettings.width / 2, y: 0 },
    //   { x: this.mapSettings.width, y: this.mapSettings.side / 2 },
    //   { x: this.mapSettings.width, y: this.mapSettings.height * 0.75 },
    //   { x: this.mapSettings.width / 2, y: this.mapSettings.height },
    //   { x: 0, y: this.mapSettings.height * 0.75 },
    //   { x: 0, y: this.mapSettings.side /2 }
    // ];
    // console.log(this.mapSettings.points)
    // this.imgPreload(imgs, ims => {
    //   images = ims;
      // this.drawBoard(screen, this.pixelsToHex(pos, this.width, this.height), images)
    // });
  }

  coordsToPixels(coords) {
    const res = {
      x: Math.floor(coords.x * this.mapSettings.width - this.mapSettings.size[0]/2 - this.mapSettings.width/2),
      y: Math.floor(coords.y * this.mapSettings.height * 0.75 + this.mapSettings.height * 0.5 - this.mapSettings.size[1]/2 - this.mapSettings.height/2)
    };
    console.log(res);
    return res;
  }

  pixelsToHex(pos) {
    let yHex = pos.y / this.mapSettings.height;
    yHex += 0.25 * Math.floor(pos.y / (this.mapSettings.height * 0.75) - 0.25);
    const xHex = pos.x / this.mapSettings.width;
    const x = Math.floor(xHex);
    const y = Math.floor(yHex);
    let yOffset = - (yHex % 1) * this.mapSettings.height;
    if (yHex < 0) {
      yOffset -= 1 * this.mapSettings.height;
    }
    return {
      y,
      x,
      yOffset,
      xOffset: - (xHex % 1) * this.mapSettings.width,
    }
  }

  drawMap(mapOffset, mapData) {
    const imageArray = this.images.length - 2;
    let fillY, fillX = fillY = true;
    // let activeHexes = {};
    console.time('calc and hex')
    for (let i = 0; fillY; ++i) {
      const posY = i * this.mapSettings.aHeight + mapOffset.yOffset;
      const yPx = posY + this.mapSettings.height / 2;

      fillY = posY + this.mapSettings.aHeight < this.mapSettings.size[1];
      fillX = true;
      for (let j = 0; fillX; ++j) {
        const offset = (i + mapOffset.y) % 2 * this.mapSettings.radius;
        const posX = j * this.mapSettings.width - offset + mapOffset.xOffset;
        const xPx = posX + this.mapSettings.width / 2;
        const x = j + mapOffset.x;
        const y = i + mapOffset.y;
        const target = `${x},${y}`;
        // activeHexes[target] = { x, y };
        const image = mapData[target] ? this.images[imageArray + 1] : this.images[Math.round(Math.random() * imageArray)]
        this.drawHexagon({ xPx, yPx, x, y }, image, mapData[target]);
        fillX = x + this.mapSettings.width < this.mapSettings.size[0];
      }
    }
    console.timeEnd('calc and hex')
    console.time('draw');
    this.layer.draw();
    console.timeEnd('draw');
    // interaction.draw();
  }

  drawHexagon(hexParams, image, data) {
    const hexagon = new Konva.RegularPolygon({
      fillPatternImage: image,
      fillPatternRepeat: 'no-repeat',
      fillPatternOffset: { x: Math.floor(this.mapSettings.width / 1.25) , y: Math.floor(this.mapSettings.height / 1.45) },
      // fillPatternOffset: { x: this.mapSettings.width / 1.5, y: this.mapSettings.height / 1.5 },
      fillPatternScale: { x: this.mapSettings.width / 128 , y: this.mapSettings.height / 128 },
      stroke: 'rgba(0,0,0,0.4)',
      strokeWidth: 1,
      x: hexParams.xPx,
      y: hexParams.yPx,
      sides: 6,
      radius: this.mapSettings.side
    });
    hexagon.on('click', e => {
      console.log(e);
      e.target.setFill('rgba(0, 255, 0, 0.2)');
      // e.target.setStrokeWidth(4);
      this.layer.draw();
    })
    hexagon.x = hexParams.x;
    hexagon.y = hexParams.y;
    hexagon['data'] = data;
    this.layer.add(hexagon);
    // interaction.add(hexInt)
  }

}
