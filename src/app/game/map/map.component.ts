import { Component, OnInit, AfterViewChecked , ElementRef, Renderer, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MapService, PlayerService, CommandService } from '../services';
import { Observable, Subject } from 'rxjs';
import * as _ from 'lodash';
import * as Big from 'big.js';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewChecked  {
  @ViewChild('map') map;

  public dragging = 0;
  public activeTown;

  private drawCoords = true;
  private mapTiles;

  private selected;
  private zoom = 1;
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
  private hoverPauser = new Subject();
  private hoverData;
  private position = {
    hover: null,
    click: null
  };

  constructor(private mapService: MapService, private playerService: PlayerService, private commandService: CommandService, private sanitizer: DomSanitizer) {
    this.mapTiles = this.mapService.mapTiles;
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
    // const t = this.mapService.pixelToCoord({ x: Big(51971.92307692308), y: Big(45422.39183161144) }, this.mapSettings)
    // console.log(t, +t.xCoord, +t.yCoord, +t.x, +t.y)

    this.playerService.activeTown.subscribe(data => {
      if (!data) {
        console.error('No active town?', data, this.playerService);
        return;
      }
      this.activeTown = data;
      this.mapOffset = this.centerOffset({ x: data.location[0], y: data.location[1] });
      this.mapService.getMapData({}).then(mapData => {
        this.mapData = mapData;
        this.mapSettings.shouldDraw = true;
        // TODO: Temporary fix
        this.hoverPauser.next(false);
        console.log('got da data', this.mapSettings.shouldDraw, this, this.mapOffset, this.mapSettings.width);
      });
    });


    // this.hoverPauser = Observable.fromEvent(this.map.nativeElement, 'mousemove').pausable(this.hoverPauser);
    const moveEvent = Observable.fromEvent(this.map.nativeElement, 'mousemove').throttleTime(50);
    this.hoverPauser.switchMap(paused => paused ? Observable.never() : moveEvent)
      .subscribe(data => this.onHover(data));
    this.hoverPauser.next(true);
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

  toggleSidenav(target, data) {
    this.commandService.targeting = data;
    this.playerService.toggleSidenav(target);
    console.log('toggle sidenav!')
  }

  public mapClick(event) {
    if (this.hoverData === null) {
      this.selected = null;
      return;
    }
    this.selected = this.hoverData;
    this.position.click = this.sanitizer.bypassSecurityTrustStyle(`translate3d(${this.selected.pos.x}px,${this.selected.pos.y}px,0) rotate(-60deg) skewY(30deg)`);
  }

  public onZoom(event) {
    event.preventDefault();
    const zoomChange = event.deltaY === 0 ? 0 : (event.deltaY > 0 ? -1 : 1);
    if (zoomChange === 0) {
      console.error('no zoom', event)
      return;
    }
    this.zoom += zoomChange / 10;
    this.setMapSettings(this.mapSettings.size, this.zoom);
    this.mapSettings.shouldDraw = true;
    console.log('zoom', event);
  }

  public startDrag(event) {
    console.log('start drag')
    const origin = { x: event.offsetX, y: event.offsetY };
    const initialOffset = _.cloneDeep(this.mapOffset);
    this.dragging = 1;
    this.hoverPauser.next(true);
    Observable.fromEvent(this.map.nativeElement, 'mousemove')
      .takeWhile(() => !!this.dragging)
      .throttleTime(10)
      .subscribe(data => this.mapDrag(origin, data, initialOffset))
  }

  public stopDrag() {
    this.dragging = 0;
    this.hoverPauser.next(false);
  }

  public mapDrag(origin, event, offset) {
    const difference = {
      x: origin.x - event.offsetX,
      y: origin.y - event.offsetY
    };
    this.dragging = 2;

    if (Math.abs(difference.x) < 5 && Math.abs(difference.y) < 5) { return; }

    this.hoverData = null;
    this.selected = null;
    this.mapOffset = this.mapService.pixelToCoord(
      { x: offset.xPx.plus(difference.x), y: offset.yPx.plus(difference.y) },
      this.mapSettings,
      true
    );
    this.mapSettings.shouldDraw = true;
  }

  private onHover(event) {
    const mouse = { x: Big(event.offsetX), y: Big(event.offsetY) };
    // console.log(+mouse.x, +mouse.y)
    const position = {
      x: this.mapOffset.xPx.plus(mouse.x),
      y: this.mapOffset.yPx.plus(mouse.y),
    };
    const coord = this.mapService.pixelToCoord(position, this.mapSettings);
    const coordString = `${+coord.xCoord},${+coord.yCoord}`;
    const town = this.mapData[coordString] || null;
    this.hoverData = town;
    // this.hoverPos = `translate3d(${event.offsetX}px,${event.offsetY}px,0)`;
    // console.log(`calc(${+mouse.y.plus(coord.y)}px - 100%)`);
    // this.hoverPos = `translate3d(${+mouse.x.plus(coord.x).plus(this.mapSettings.radius)}px,calc(${+mouse.y.plus(coord.y)}px - 100%),0)`;
    // console.log(this.hoverPos, , );
    if (!town) { return; }
    this.hoverData.pos = {
      x: mouse.x.plus(coord.x),
      y: mouse.y.plus(coord.y)
    };
    this.position.hover = `translate3d(${+mouse.x.plus(coord.x).plus(this.mapSettings.radius)}px,${+mouse.y.plus(coord.y).minus(this.mapSettings.aHeight  )}px,0)`;
    this.hoverData.distance = this.mapService.distanceFromCoord(
      { x: this.activeTown.location[0], y: this.activeTown.location[1] },
      { x: +coord.xCoord, y: +coord.yCoord }
    );

    // Fill
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(+mouse.x.plus(this.mapSettings.width.div(2)).plus(coord.x), +mouse.y.plus(coord.y));
    this.mapSettings.points.forEach(point => {
      this.ctx.lineTo(+point.x.plus(mouse.x).plus(coord.x), +point.y.plus(mouse.y).plus(coord.y));
    });
    this.ctx.closePath();
    this.ctx.fillStyle = 'rgba(255,0,0,0.1)';
    this.ctx.fill();
    this.ctx.clip();
    this.ctx.restore();
    // Fill end

  }

  private setMapSettings(size, zoom = 1) {
    const width = new Big(size.x).div(13).times(zoom);
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
    return this.mapService.pixelToCoord(leftCorner, this.mapSettings, true);
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
    const image = data ?
      (data.owner ? this.mapTiles.object : this.mapTiles.objectType.abandoned ) :
      this.mapTiles.tiles [Math.round(this.rng(coordString) * (this.mapTiles.tiles.length - 1))];
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(+x.plus(this.mapSettings.width.div(2)), +y);
    this.mapSettings.points.forEach(point => {
      this.ctx.lineTo(+point.x.plus(x), +point.y.plus(y));
    });
    this.ctx.closePath();
    this.ctx.clip();
    this.ctx.drawImage(
      this.mapTiles.image,
      image[0], image[1],
      this.mapTiles.size[0], this.mapTiles.size[1],
      +x, +y,
      +this.mapSettings.width, +this.mapSettings.height
    );
    this.ctx.restore();

    if (data && data._id === this.activeTown._id) {
      const type = this.mapTiles.objectType.owned;
      this.ctx.drawImage(
        this.mapTiles.image,
        // this.mapTiles.object[0], this.mapTiles.object[1],
        type[0], type[1],
        this.mapTiles.size[0], this.mapTiles.size[1],
        +x, +y,
        +this.mapSettings.width, +this.mapSettings.height
      );
      // this.ctx.globalCompositeOperation = 'multiply';
      // this.ctx.fillStyle = data.owner ? 'yellow': 'rgba(100,100,100,0.4)';
      // this.ctx.fill();
      // this.ctx.globalCompositeOperation = 'source-over';
    }

    // this.ctx.strokeStyle= 'rgba(0,0,0,0.2)';
    this.ctx.strokeStyle= '#27ae60';
    this.ctx.stroke();

    if (this.drawCoords) {
      this.ctx.font = "14pt Calibri";
      this.ctx.fillStyle = "#ff0000";
      this.ctx.lineWidth = 1;
      this.ctx.strokeText(coordString, +x, +y + this.mapSettings.height / 2);
      this.ctx.fillText(coordString, +x, +y + this.mapSettings.height / 2);
    }
  }
}
