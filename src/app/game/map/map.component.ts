import { Component, AfterContentInit, OnInit, OnDestroy, AfterViewChecked , ElementRef, Renderer, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { combineLatest, throttleTime, takeWhile, filter, switchMap } from 'rxjs/operators';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/never';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { Big } from 'big.js';
import { Store } from '@ngrx/store';

import { GameModuleState, getTownState, getPlayerAlliance, getMapData } from '../../store';
import { MapService, CommandService } from '../services';
import { Town } from '../../store/town/town.model';
import { MapActions, LoadMap } from '../../store/map/map.actions';
import { PlayerActions, SetSidenav } from '../../store/player/player.actions';
import { Alliance } from '../../store/alliance/alliance.model';
import { Map } from '../../store/map/map.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterContentInit, AfterViewChecked, OnInit, OnDestroy  {
  @ViewChild('map') map;
  public townState$ = this.store.select(getTownState);
  public alliance$ = this.store.select(getPlayerAlliance).pipe(
    filter((alliance) => !!alliance)
  );
  public mapUpdate$ = this.store.select(getMapData).pipe(
    combineLatest(this.mapService.imagesLoaded)
  );
  public dragging = 0;
  public allianceDiplomacy: { [id: number]: string } = {};
  public activeTown: Town;
  public playerTowns: Town[];
  public playerTownIds: number[];
  public boxSize = {
    x: 260,
    y: 80,
  };

  public drawCoords = false;
  public mapTiles;

  public selected;
  public zoom = 1;
  public mapData: Map;
  public mapOffset;
  public mapSettings = {
    size: { x: 100, y: 100 },
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
  public ctx;
  public rng;
  public hoverPauser = new Subject();
  // public hoverData: Observable;
  public hoverData;
  public position = {
    hover: null,
    click: null
  };

  public townSubscription: Subscription;
  public mapSubscription: Subscription;
  public allianceSubscription: Subscription;

  constructor(
    private mapService: MapService,
    private store: Store<GameModuleState>,
    private commandService: CommandService,
    private sanitizer: DomSanitizer
  ) {
    this.mapTiles = this.mapService.mapTiles;
    this.rng = this.mapService.rng;
  }

  public ngAfterContentInit() {
    this.ctx = this.map.nativeElement.getContext('2d');
    this.ctx.lineWidth = 1;

    const moveEvent = Observable.merge(
      Observable.fromEvent(this.map.nativeElement, 'mousemove'),
      Observable.fromEvent(this.map.nativeElement, 'touchmove')
    ).pipe(throttleTime(50));
    const pausableMove = this.hoverPauser.pipe(
      switchMap(paused => paused ? Observable.never() : moveEvent)
    );
    pausableMove.subscribe(data => this.onHover(data));
    this.hoverPauser.next(!this.mapData);
  }

  public ngOnInit() {
    this.store.dispatch(new LoadMap());
    this.mapSubscription = this.mapUpdate$.subscribe(([map, imagesLoaded]) => {
      if (map && imagesLoaded) {
        if (!this.mapData) {
          this.hoverPauser.next(false);
        }
        this.mapData = map;
        this.mapSettings.shouldDraw = true;
      }
    });
    this.townSubscription = this.townState$.subscribe(townState => {
      if (!townState.activeTown) { return; }
      this.activeTown = townState.playerTowns.find((town) => town.id === townState.activeTown);
    this.playerTowns = townState.playerTowns;
      this.playerTownIds = townState.playerTowns.map((town) => town.id);

      this.setMapSettings({
        x: this.map.nativeElement.offsetWidth,
        y: this.map.nativeElement.offsetHeight
      });
      this.mapOffset = this.centerOffset({ x: this.activeTown.location[0], y: this.activeTown.location[1] });
      this.mapSettings.shouldDraw = !!this.mapData;
    });
    this.allianceSubscription = this.alliance$.subscribe((alliance) => {
      let diplomacy = alliance.DiplomacyTarget.reduce((result, { status, OriginAllianceId, type}) => {
        if (status === 'ongoing') { result[OriginAllianceId] = type; }
        return result;
      }, {});
      diplomacy = alliance.DiplomacyOrigin.reduce((result, { status, TargetAllianceId, type }) => {
        if (status === 'ongoing') { result[TargetAllianceId] = type; }
        return result;
      }, diplomacy);

      this.allianceDiplomacy = {
        ...diplomacy,
        [alliance.id]: 'member',
      }
      this.mapSettings.shouldDraw = true;
    });
  }

  public ngOnDestroy() {
    this.townSubscription.unsubscribe();
    this.mapSubscription.unsubscribe();
  }

  public ngAfterViewChecked() {
    if (this.ctx && this.mapSettings.shouldDraw && this.activeTown && this.mapData) {
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
    this.commandService.targeting.next(data);
    this.store.dispatch(new SetSidenav([{ side: 'left', name: 'command' }]));
  }

  public mapClick(event) {
    if (this.hoverData === null) {
      this.selected = null;
      return;
    }
    this.toggleSidenav('command', this.hoverData.location);
    this.selected = this.hoverData;
    // this.position.click =
    // this.sanitizer.bypassSecurityTrustStyle(`translate3d(${this.selected.pos.x}px,${this.selected.pos.y}px,0) rotate(-60deg) skewY(30deg)`);
  }

  public onZoom(event) {
    event.preventDefault();
    // const zoomChange = event.deltaY === 0 ? 0 : (event.deltaY > 0 ? -1 : 1);
    // if (zoomChange === 0) {
    //   console.error('no zoom', event)
    //   return;
    // }
    // this.zoom += zoomChange / 10;
    // this.setMapSettings(this.mapSettings.size, this.zoom);
    // this.mapSettings.shouldDraw = true;
    // console.log('zoom', event);
  }

  public startDrag(event) {
    const origin = {
      x: event.offsetX || event.touches[0].pageX - event.touches[0].target.offsetLeft,
      y: event.offsetY || event.touches[0].pageY - event.touches[0].target.offsetTop,
    };
    const initialOffset = _.cloneDeep(this.mapOffset);
    this.dragging = 1;
    this.hoverPauser.next(true);
    console.log('welp da darag should start');
    // Observable.fromEvent(this.map.nativeElement, 'mousemove')
    Observable.merge(
      Observable.fromEvent(this.map.nativeElement, 'mousemove'),
      Observable.fromEvent(this.map.nativeElement, 'touchmove')
    ).pipe(
      takeWhile(() => !!this.dragging),
      throttleTime(10),
    )
      .subscribe(data => this.mapDrag(origin, data, initialOffset));
  }

  public stopDrag() {
    this.dragging = 0;
    this.hoverPauser.next(false);
  }

  public mapDrag(origin, event, offset) {
    const difference = {
      x: origin.x - (event.offsetX || event.touches[0].pageX - event.touches[0].target.offsetLeft),
      y: origin.y - (event.offsetY || event.touches[0].pageY - event.touches[0].target.offsetTop)
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
    // this.mapSettings.shouldDraw = true;
    this.drawMap(this.mapOffset);
  }

  private onHover(event) {
    const mouse = { x: Big(event.offsetX), y: Big(event.offsetY) };
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
    const xPos = mouse.x.plus(coord.x).plus(this.mapSettings.radius);
    const yPos = mouse.y.plus(coord.y);

    this.hoverData.pos = {
      x: xPos.plus(this.boxSize.x).gte(this.mapSettings.size.x) ? xPos.minus(this.boxSize.x) : xPos,
      // y: yPos,
      y: yPos.minus(this.boxSize.y).lte(0) ? yPos.plus(this.mapSettings.height) : yPos.minus(this.mapSettings.aHeight)
    };
    this.position.hover = `translate3d(${+this.hoverData.pos.x}px,${+this.hoverData.pos.y}px,0)`;
    // this.position.hover =
    // `translate3d(${+mouse.x.plus(coord.x).plus(this.mapSettings.radius)}px,${+mouse.y.plus(coord.y).minus(this.mapSettings.aHeight  )}px,0)`;
    this.hoverData.distance = this.mapService.distanceFromCoord(
      { x: this.activeTown.location[0], y: this.activeTown.location[1] },
      { x: +coord.xCoord, y: +coord.yCoord }
    );

    // Fill
    // this.ctx.save();
    // this.ctx.beginPath();
    // this.ctx.moveTo(+mouse.x.plus(this.mapSettings.width.div(2)).plus(coord.x), +mouse.y.plus(coord.y));
    // this.mapSettings.points.forEach(point => {
    //   this.ctx.lineTo(+point.x.plus(mouse.x).plus(coord.x), +point.y.plus(mouse.y).plus(coord.y));
    // });
    // this.ctx.closePath();
    // this.ctx.fillStyle = 'rgba(255,0,0,0.1)';
    // this.ctx.fill();
    // this.ctx.clip();
    // this.ctx.restore();
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
        const offsetModifier = parity ? 1 : -1;
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
  }

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

    if (data) {
      if (this.playerTownIds.includes(data.id)) {
        const type = this.activeTown.id === data.id ?
          this.mapTiles.objectType.ownedActive : this.mapTiles.objectType.owned;
        this.ctx.drawImage(
          this.mapTiles.image,
          type[0], type[1],
          this.mapTiles.size[0], this.mapTiles.size[1],
          +x, +y,
          +this.mapSettings.width, +this.mapSettings.height
        );
        // this.ctx.globalCompositeOperation = 'multiply';
        // this.ctx.fillStyle = data.owner ? 'yellow': 'rgba(100,100,100,0.4)';
        // this.ctx.fill();
        // this.ctx.globalCompositeOperation = 'source-over';
      } else if (data.alliance && this.allianceDiplomacy[data.alliance.id]) {
        const target = this.allianceDiplomacy[data.alliance.id];
        this.ctx.drawImage(
          this.mapTiles.image,
          this.mapTiles.objectType[target][0], this.mapTiles.objectType[target][1],
          this.mapTiles.size[0], this.mapTiles.size[1],
          +x, +y,
          +this.mapSettings.width, +this.mapSettings.height
        );
      }
    }

    // this.ctx.strokeStyle= 'rgba(0,0,0,0.2)';
    this.ctx.strokeStyle = '#27ae60';
    this.ctx.stroke();

    if (this.drawCoords) {
      this.ctx.font = '14pt Calibri';
      this.ctx.fillStyle = '#ff0000';
      this.ctx.lineWidth = 1;
      this.ctx.strokeText(coordString, +x, +y + this.mapSettings.height / 2);
      this.ctx.fillText(coordString, +x, +y + this.mapSettings.height / 2);
    }
  }
}
