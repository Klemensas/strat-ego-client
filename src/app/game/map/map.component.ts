import { Component, OnInit, AfterViewChecked , ElementRef, Renderer, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MapService, PlayerService } from '../services';
import { Observable } from 'rxjs';
import * as cloneDeep from 'lodash/cloneDeep';
import * as Big from 'big.js';

@Component({
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, AfterViewChecked  {
  public dragging = false;

  private drawCoords = true;
  private images;

  private mapData;
  private mapOffset;
  private mapSettings = {
    size: { x: 0, y: 0 },
    width: <any>0,
    height: <any>0,
    side: <any>0,
    radius: <any>0,
    aHeight: <any>0,
    hexHeight: <any>0,
    edgeGradient: <any>0,
    points: [],
    shouldDraw: false,
  };
  private ctx;
  private rng;
  private drag;
  // private dragging;

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
      this.mapOffset = this.centerOffset({ x: data.location[0], y: data.location[1] });
      this.mapService.getMapData(location).then(mapData => {
        this.mapData = mapData;
        this.mapSettings.shouldDraw = true;
        console.log('got da data', this.mapSettings.shouldDraw, this, this.mapOffset, this.mapSettings.width);
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
    // this.mapOffset = this.centerOffset({})
    this.mapSettings.shouldDraw = true;
  }

  public mapClick(event) {
    console.log('click')
  }

  public startDrag(event) {
    const origin = { x: event.offsetX, y: event.offsetY };
    const initialOffset = cloneDeep(this.mapOffset);
    this.dragging = true;
    Observable.fromEvent(this.map.nativeElement, 'mousemove')
      .takeWhile(() => this.dragging)
      .throttleTime(10)
      .subscribe(data => this.mapDrag(origin, data, initialOffset))
  }

  public mapDrag(origin, event, offset) {
    const difference = {
      x: origin.x - event.offsetX,
      y: origin.y - event.offsetY
    };

    if (Math.abs(difference.x) < 5 && Math.abs(difference.y) < 5) { return; }

    this.mapOffset = this.mapService.pixelToCoord(
      { x: offset.xPx.plus(difference.x), y: offset.yPx.plus(difference.y) },
      this.mapSettings
    );
    this.mapSettings.shouldDraw = true;
  }

  private setMapSettings(size) {
    const width = new Big(size.x).div(13);
    const side = width.div(Big(3).sqrt());
    const radius = width.div(2);
    const height = side.times(2);
    const hexHeight = side.div(2);
    const aHeight = height.times(0.75);

    this.mapSettings = {
      size,
      side,
      radius,
      width,
      height,
      aHeight,
      hexHeight,
      edgeGradient: hexHeight.div(radius),
      shouldDraw: false,
      points: [
        { x: width, y: hexHeight },
        { x: width, y: aHeight },
        { x: radius, y: height },
        { x: Big(0), y: aHeight },
        { x: Big(0), y: hexHeight },
      ]
    };
  }

  private centerOffset(location) {
    const centerLoc = this.mapService.coordToPixel(location, this.mapSettings);
    const center = [
      this.mapSettings.size.x / 2,
      this.mapSettings.size.y / 2
    ];
    const leftCorner = {
      x: centerLoc.x.minus(center[0]),
      y: centerLoc.y.minus(center[1]),
    };
    return this.mapService.pixelToCoord(leftCorner, this.mapSettings);
  }

  private drawMap(offset) {
    const parity = +offset.yCoord % 2;
    const yMax = +Big(this.mapSettings.size.y).minus(offset.y).div(this.mapSettings.aHeight).round(0, 3);
    // console.log(`Drawin y for ${yMax} rows`);
    this.ctx.clearRect(0, 0, this.mapSettings.size.x, this.mapSettings.size.y);
    for (let y = 0; y < yMax; y++) {
      const yCoord = offset.yCoord.plus(y);
      const yPos = Big(y).times(this.mapSettings.aHeight).plus(offset.y);
      let xOffset = offset.x;
      let x = 0;
      if (y && +yCoord % 2 !== parity) {
        const offsetModifier = parity ? 1: -1;
        xOffset = xOffset.plus(this.mapSettings.width.times(offsetModifier).div(2));
        x -= parity;
      }
      const xMax = +Big(this.mapSettings.size.x).minus(offset.x).minus(xOffset).div(this.mapSettings.width);
      // console.log(`Drawin x for ${xMax} columns, when y is ${yCoord}`);
      for (; x < xMax; x++) {
        const xCoord = offset.xCoord.plus(x);
        const xPos = Big(x).times(this.mapSettings.width).plus(xOffset);
        this.drawHex(xPos, yPos, `${xCoord},${yCoord}`);
      }
    }
    this.mapSettings.shouldDraw = false;
  };

  private drawHex(x, y, coordString) {
    const data = this.mapData[coordString];
    const image = data ? this.images[this.images.length - 1] :
      this.images[Math.round(this.rng(coordString) * (this.images.length - 2))];
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(+x.plus(this.mapSettings.width.div(2)), +y);
    this.mapSettings.points.forEach(point => {
      this.ctx.lineTo(+point.x.plus(x), +point.y.plus(y));
    });
    this.ctx.closePath();
    this.ctx.clip();
    this.ctx.drawImage(image, +x, +y, +this.mapSettings.width, +this.mapSettings.height);
    this.ctx.restore();
    this.ctx.stroke();

    if (data) {
      this.ctx.globalCompositeOperation = 'darker';
      this.ctx.fillStyle = data.owner ? 'yellow': 'rgba(100,100,100,0.4)';
      this.ctx.fill();
      this.ctx.globalCompositeOperation = 'source-over';
    }
    if (this.drawCoords) {
      this.ctx.font = "20pt Calibri";
      this.ctx.fillStyle = "#ff0000";
      this.ctx.lineWidth = 1;
      this.ctx.strokeText(coordString, +x, +y + this.mapSettings.height / 2);
      this.ctx.fillText(coordString, +x, +y + this.mapSettings.height / 2);
    }
  }
}
