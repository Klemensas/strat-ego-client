import { Component, OnInit, AfterViewChecked , ElementRef, Renderer, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MapService, MapUtilityService, PlayerService } from '../services';

@Component({
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, AfterViewChecked  {
  private stage;
  private layer;

  private images;

  private mapData;
  private mapOffset;
  private isReady = false;
  private mapSettings = {
    size: { width: 0, height: 0 },
    width: 0,
    height: 0,
    side: 0,
    radius: 0,
    aHeight: 0,
    hexHeight: 0,
    points: [],
    shouldDraw: false
  };
  private ctx;
  private rng;

  @ViewChild('map') map;

  constructor(private mapService: MapService, private mapUtilityService: MapUtilityService, private playerService: PlayerService) {
    this.images = this.mapService.images;
    this.rng = this.mapService.rng;
  }

  ngOnInit() {
    this.mapSettings.size = {
      width: this.map.nativeElement.offsetWidth,
      height: this.map.nativeElement.offsetHeight
    };
  }

  ngAfterViewInit() {
    this.ctx = this.map.nativeElement.getContext('2d');
    this.ctx.lineWidth = 1;
    this.initMap();
    // this.mapUtilityService.initMap(this.map.nativeElement);
    this.playerService.activeTown.subscribe(data => {
        if (!data) {
          console.error('No active town?', data, this.playerService);
          return;
        }
        const location = { x: data.location[0], y: data.location[1] };
        this.mapService.getMapData(location).then(mapData => {
          this.mapData = mapData;
          this.mapSettings.shouldDraw = true;
        });
    });
  }

  ngAfterViewChecked() {
    if (this.ctx && this.mapSettings.shouldDraw) {
      this.drawMap({});
    }
  }

  onResize(event) {
    this.mapSettings.size = {
      width: this.map.nativeElement.offsetWidth,
      height: this.map.nativeElement.offsetHeight
    };
    if (this.mapData) {
      this.mapSettings.shouldDraw = true;
    }
    // // this.stage.draw();
    // this.ctx = this.map.nativeElement.getContext('2d');
    // this.initMap();
  }

  public mapClick(event) {
    console.log(this, this.pixelToCoord({ x: event.layerX, y: event.layerY }))
  }

  private pixelToCoord(pos) {
    const secX = Math.floor(pos.x / this.mapSettings.width);
    const secY = Math.floor(pos.y / (this.mapSettings.hexHeight + this.mapSettings.side));
    const secPxX = pos.x % this.mapSettings.width;
    const secPxY = pos.y % (this.mapSettings.hexHeight + this.mapSettings.side);
    let res = { x: secX, y: secY };
    const m = this.mapSettings.hexHeight /  this.mapSettings.radius;
    if (secY % 2) { // B
      if (secPxX >= this.mapSettings.radius) {
        // if (secPxY < (2 * this.mapSettings.hexHeight - secPxX * m)) {
        if (secPxY < (this.mapSettings.side - secPxX * m)) {
          // res.x = secX;
          res.y = secY - 1;
        } else {
          // res.x = secX;
          // res.y = secY;
        }
      } else {
        if (secPxY < (secPxX * m)) {
          // res.x = secX;
          res.y = secY - 1;
        } else {
          res.x = secX - 1;
          // res.y = secY;
        }
      }
    } else {
      if (secPxY < (this.mapSettings.hexHeight - secPxX * m)) {
        res.x = secX - 1;
        res.y = secY - 1;
      }
      if (secPxY < (-this.mapSettings.hexHeight + secPxX * m)) {
        // res.x = secX;
        res.y = secY - 1;
      }
    }
    return res;
  }

  private initMap() {
    this.mapSettings.width = this.mapSettings.size.width / 13;
    this.mapSettings.side = this.mapSettings.width / Math.sqrt(3);
    this.mapSettings.height = 2 * this.mapSettings.side;
    this.mapSettings.radius = this.mapSettings.width / 2;
    this.mapSettings.aHeight = this.mapSettings.height * 0.75; // ?
    this.mapSettings.hexHeight = this.mapSettings.side / 2;
    this.mapSettings.points = [
      // { x: this.mapSettings.width / 2, y: 0 },
      { x: this.mapSettings.width, y: this.mapSettings.side / 2 },
      { x: this.mapSettings.width, y: this.mapSettings.height * 0.75 },
      { x: this.mapSettings.width / 2, y: this.mapSettings.height },
      { x: 0, y: this.mapSettings.height * 0.75 },
      { x: 0, y: this.mapSettings.side /2 }
    ];
  }

  private drawMap(data) {
    for (let y = 0; y < this.mapSettings.size.height; y += this.mapSettings.aHeight){
      let xOffset = parseInt((y / this.mapSettings.aHeight).toPrecision(12)) % 2 ? this.mapSettings.width / 2 : 0;
      for (let x = 0; x < this.mapSettings.size.width; x += this.mapSettings.width){
        const index = Math.round(this.rng() * (this.images.length - 1));
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(x + xOffset + this.mapSettings.width / 2, y);
        this.mapSettings.points.forEach(point => this.ctx.lineTo(point.x + x + xOffset, point.y + y));
        this.ctx.closePath();
        this.ctx.clip();
        this.ctx.drawImage(this.images[index], x + xOffset, y, this.mapSettings.width, this.mapSettings.height);
        this.ctx.stroke();
        this.ctx.restore();
      }
    }
    this.mapSettings.shouldDraw = false;
  };

  // initMap(width) {
  //   this.mapSettings.width = Math.floor(width);
  //   this.mapSettings.side = this.mapSettings.width / Math.sqrt(3);
  //   this.mapSettings.height = Math.floor(2 * this.mapSettings.side);
  //   this.mapSettings.radius = this.mapSettings.width / 2;
  //   this.mapSettings.aHeight = this.mapSettings.height * 0.75;
  //   this.mapSettings.hexHeight = this.mapSettings.side / 2;
  //   console.log(this.mapSettings);
  //   // this.mapSettings.points = [
  //   //   { x: this.mapSettings.width / 2, y: 0 },
  //   //   { x: this.mapSettings.width, y: this.mapSettings.side / 2 },
  //   //   { x: this.mapSettings.width, y: this.mapSettings.height * 0.75 },
  //   //   { x: this.mapSettings.width / 2, y: this.mapSettings.height },
  //   //   { x: 0, y: this.mapSettings.height * 0.75 },
  //   //   { x: 0, y: this.mapSettings.side /2 }
  //   // ];
  //   // console.log(this.mapSettings.points)
  //   // this.imgPreload(imgs, ims => {
  //   //   images = ims;
  //     // this.drawBoard(screen, this.pixelsToHex(pos, this.width, this.height), images)
  //   // });
  // }

  // coordsToPixels(coords) {
  //   const res = {
  //     x: Math.floor(coords.x * this.mapSettings.width - this.mapSettings.size[0]/2 - this.mapSettings.width/2),
  //     y: Math.floor(coords.y * this.mapSettings.height * 0.75 + this.mapSettings.height * 0.5 - this.mapSettings.size[1]/2 - this.mapSettings.height/2)
  //   };
  //   console.log(res);
  //   return res;
  // }

  // pixelsToHex(pos) {
  //   let yHex = pos.y / this.mapSettings.height;
  //   yHex += 0.25 * Math.floor(pos.y / (this.mapSettings.height * 0.75) - 0.25);
  //   const xHex = pos.x / this.mapSettings.width;
  //   const x = Math.floor(xHex);
  //   const y = Math.floor(yHex);
  //   let yOffset = - (yHex % 1) * this.mapSettings.height;
  //   if (yHex < 0) {
  //     yOffset -= 1 * this.mapSettings.height;
  //   }
  //   return {
  //     y,
  //     x,
  //     yOffset,
  //     xOffset: - (xHex % 1) * this.mapSettings.width,
  //   }
  // }

  // drawMap(mapOffset, mapData) {
  //   const imageArray = this.images.length - 2;
  //   let fillY, fillX = fillY = true;
  //   // let activeHexes = {};
  //   console.time('calc and hex')
  //   for (let i = 0; fillY; ++i) {
  //     const posY = i * this.mapSettings.aHeight + mapOffset.yOffset;
  //     const yPx = posY + this.mapSettings.height / 2;

  //     fillY = posY + this.mapSettings.aHeight < this.mapSettings.size[1];
  //     fillX = true;
  //     for (let j = 0; fillX; ++j) {
  //       const offset = (i + mapOffset.y) % 2 * this.mapSettings.radius;
  //       const posX = j * this.mapSettings.width - offset + mapOffset.xOffset;
  //       const xPx = posX + this.mapSettings.width / 2;
  //       const x = j + mapOffset.x;
  //       const y = i + mapOffset.y;
  //       const target = `${x},${y}`;
  //       // activeHexes[target] = { x, y };
  //       const image = mapData[target] ? this.images[imageArray + 1] : this.images[Math.round(Math.random() * imageArray)]
  //       this.drawHexagon({ xPx, yPx, x, y }, image, mapData[target]);
  //       fillX = x + this.mapSettings.width < this.mapSettings.size[0];
  //     }
  //   }
  //   console.timeEnd('calc and hex')
  //   console.time('draw');
  //   this.layer.draw();
  //   console.timeEnd('draw');
  //   // interaction.draw();
  // }

  // drawHexagon(hexParams, image, data) {
  //   const hexagon = new Konva.RegularPolygon({
  //     fillPatternImage: image,
  //     fillPatternRepeat: 'no-repeat',
  //     fillPatternOffset: { x: Math.floor(this.mapSettings.width / 1.25) , y: Math.floor(this.mapSettings.height / 1.45) },
  //     // fillPatternOffset: { x: this.mapSettings.width / 1.5, y: this.mapSettings.height / 1.5 },
  //     fillPatternScale: { x: this.mapSettings.width / 128 , y: this.mapSettings.height / 128 },
  //     stroke: 'rgba(0,0,0,0.4)',
  //     strokeWidth: 1,
  //     x: hexParams.xPx,
  //     y: hexParams.yPx,
  //     sides: 6,
  //     radius: this.mapSettings.side
  //   });
  //   hexagon.on('click', e => {
  //     console.log(e);
  //     e.target.setFill('rgba(0, 255, 0, 0.2)');

  //     // e.target.setStrokeWidth(4);
  //     this.layer.draw();
  //   })
  //   hexagon.x = hexParams.x;
  //   hexagon.y = hexParams.y;
  //   hexagon['data'] = data;
  //   this.layer.add(hexagon);
  //   // interaction.add(hexInt)
  // }

}
