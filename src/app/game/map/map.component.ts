import { Component, OnInit, AfterViewChecked , ElementRef, Renderer, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MapService, PlayerService } from '../services';

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
  private markedTowns = {};
  private isReady = false;
  private mapSettings = {
    size: { x: 0, y: 0 },
    width: 0,
    height: 0,
    side: 0,
    radius: 0,
    aHeight: 0,
    hexHeight: 0,
    points: [],
    shouldDraw: false,
  };
  private ctx;
  private rng;

  @ViewChild('map') map;

  constructor(private mapService: MapService, private playerService: PlayerService) {
    this.images = this.mapService.images;
    this.rng = this.mapService.rng;
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.ctx = this.map.nativeElement.getContext('2d');
    this.ctx.lineWidth = 1;

    this.setMapSettings({
      x: this.map.nativeElement.offsetWidth,
      y: this.map.nativeElement.offsetHeight
    });

    this.playerService.activeTown.subscribe(data => {
        if (!data) {
          console.error('No active town?', data, this.playerService);
          return;
        }
        this.markedTowns[`${data.location[0]},${data.location[1]}`] = 'rgba(255,225,53, 0.4)';
        this.mapOffset = this.centerOffset({ x: data.location[0], y: data.location[1] });
        this.mapService.getMapData(location).then(mapData => {
          this.mapData = mapData;
          this.mapSettings.shouldDraw = true;
            console.log(this.mapSettings.shouldDraw, this, this.mapOffset);
        });
    });
  }

  ngAfterViewChecked() {
    if (this.ctx && this.mapSettings.shouldDraw && this.mapData) {

      this.drawMap(this.mapOffset);
    }
  }

  onResize(event) {
    this.setMapSettings({
      x: this.map.nativeElement.offsetWidth,
      y: this.map.nativeElement.offsetHeight,
    });
    this.mapSettings.shouldDraw = true;
  }

  public mapClick(event) {
    console.log('click')
  }

  public dragging(drag, event) {
    console.log('toggle drag',drag)
    if (drag) {
      this.map.nativeElement.addEventListener('mousemove', this.mapDrag);
    } else {
      this.map.nativeElement.removeEventListener('mousemove', this.mapDrag);
    }
  }

  public mapDrag(event){

  }
  
  private coordToPixel(location) {
    const x = location.x;
    const y = location.y;
    const xOffset = y % 2 ? -0.5 : 0;
    return {
      x: (x + xOffset) * this.mapSettings.width,
      y: (y * 0.75 - 0.25) * this.mapSettings.height
    };
  }

  private pixelToCoord(pos) {
    const secX = Math.floor(pos.x / this.mapSettings.width);
    const secY = Math.floor(pos.y / (this.mapSettings.hexHeight + this.mapSettings.side));
    const secPxX = pos.x % this.mapSettings.width;
    const secPxY = pos.y % (this.mapSettings.hexHeight + this.mapSettings.side);
    let res = { x: secX, y: secY };
    const m = this.mapSettings.hexHeight / this.mapSettings.radius;
    if (secY % 2) { // B
      if (secPxX >= this.mapSettings.radius) {
        if (secPxY < (this.mapSettings.side - secPxX * m)) {
          res.y = secY - 1;
        }
      } else {
        if (secPxY < (secPxX * m)) {
          res.y = secY - 1;
        } else {
          res.x = secX - 1;
        }
      }
    } else {
      if (secPxY < (this.mapSettings.hexHeight - secPxX * m)) {
        res.x = secX - 1;
        res.y = secY - 1;
      }
      if (secPxY < (-this.mapSettings.hexHeight + secPxX * m)) {
        res.y = secY - 1;
      }
    }
    return res;
  }

  private setMapSettings(size) {
    const width = size.x / 13;
    const side = width / Math.sqrt(3);
    const radius = width / 2;
    const height = side * 2;
    const hexHeight = side / 2;
    const aHeight = height * 0.75;

    this.mapSettings = {
      size,
      side,
      radius,
      width,
      height,
      aHeight,
      hexHeight,
      shouldDraw: false,
      points: [
        { x: width, y: hexHeight },
        { x: width, y: aHeight },
        { x: radius, y: height },
        { x: 0, y: aHeight },
        { x: 0, y: hexHeight },
      ]
    };
  }

  private centerOffset(location) {
    const center = [
      this.mapSettings.size.x / 2,
      this.mapSettings.size.y / 2
    ];
    const hexEnd = [
      center[0] - this.mapSettings.width / 2,
      center[1] - this.mapSettings.height / 2
    ];
    const yDiff = Math.ceil(hexEnd[1] / this.mapSettings.aHeight);
    const yCoord = location.y - yDiff;
    const parityChange = yDiff % 2;
    const y = hexEnd[1] - yDiff * this.mapSettings.aHeight;
    const xDiff = Math.ceil(hexEnd[0] / this.mapSettings.width + parityChange);
    const xCoord = location.x - xDiff;
    const xChange = parityChange ? (yCoord % 2 ? -this.mapSettings.width / 2 : this.mapSettings.width / 2) : 0;
    const x = hexEnd[0] - xDiff * this.mapSettings.width + xChange;
    const pixelLoc = this.coordToPixel(location);
    const position = {
      x: pixelLoc.x - center[0] - Math.abs(x),
      y: pixelLoc.y - center[1] - Math.abs(y),
    }
    return { x, y, xCoord, yCoord, position };
  }

  private drawMap(offset) {
    const drawCoords = true;
    const parity = offset.yCoord % 2;
    const yMax = Math.ceil((this.mapSettings.size.y - offset.y) / this.mapSettings.aHeight);
    // console.log(`Drawin y for ${yMax} rows`);
    for (let y = 0; y < yMax; y++) {
      const yCoord = offset.yCoord + y;
      const yPos = offset.y + y * this.mapSettings.aHeight;
      let xOffset = offset.x;
      let x = 0;
      if (y && yCoord % 2 !== parity) {
        xOffset += parity ? this.mapSettings.width / 2 : -this.mapSettings.width / 2;
        x -= parity ? 1 : 0;
      }
      const xMax = Math.ceil((this.mapSettings.size.x - offset.x - xOffset) / this.mapSettings.width);
      // console.log(`Drawin x for ${xMax} columns, when y is ${yCoord}`);
      for (; x < xMax; x++) {
        const xCoord = offset.xCoord + x;
        const xPos = x * this.mapSettings.width + xOffset;
        const image = this.mapData[`${xCoord},${yCoord}`] ?
          this.images[this.images.length - 1] :
          this.images[Math.round(this.rng() * (this.images.length - 2))];

        this.drawHex(xPos, yPos, image, this.markedTowns[`${xCoord},${yCoord}`]);
        if (drawCoords) {
          this.ctx.font = "20pt Calibri";
          this.ctx.fillStyle = "#ff0000";
          this.ctx.lineWidth = 1;
          this.ctx.strokeText(`${xCoord};${yCoord}`, xPos, yPos + this.mapSettings.height / 2);
          this.ctx.fillText(`${xCoord};${yCoord}`, xPos, yPos + this.mapSettings.height / 2);
        }
      }
    }
    this.mapSettings.shouldDraw = false;
  };

  private drawHex(x, y, image, fill) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo(x + this.mapSettings.width / 2, y);
      this.mapSettings.points.forEach(point => this.ctx.lineTo(point.x + x, point.y + y));
      this.ctx.closePath();
      this.ctx.clip();
      this.ctx.drawImage(image, x, y, this.mapSettings.width, this.mapSettings.height);
      this.ctx.restore();
      this.ctx.stroke();
      if (fill) {
        this.ctx.globalCompositeOperation = 'overlay';
        this.ctx.fillStyle = fill;
        this.ctx.fill();
        this.ctx.globalCompositeOperation = 'source-over';
      }
  }
}
