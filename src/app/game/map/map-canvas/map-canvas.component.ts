import { Component, OnChanges, ViewChild, ElementRef, AfterContentInit, Input, SimpleChanges, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { Observable , Subject, Subscription, never, merge, fromEvent } from 'rxjs';
import { takeWhile, throttleTime, switchMap } from 'rxjs/operators';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faUsers, faExchangeAlt, faSortAmountUp, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

import { MapService } from '../../services';
import { MapTown, WorldData, Dict, Coords } from 'strat-ego-common';
import { Hex, Layout, Point } from '../../services/map.service';
import { TownState } from '../../town/town.reducer';

export interface HexSize {
  width: number;
  height: number;
  size: number;
}

@Component({
  selector: 'map-canvas',
  templateUrl: './map-canvas.component.html',
  styleUrls: ['./map-canvas.component.scss']
})
export class MapCanvasComponent implements OnChanges, AfterContentInit, AfterViewChecked {
  @ViewChild('map') public map: ElementRef;

  @Input() townState: TownState;
  @Input() worldData: WorldData;
  @Input() mapData: MapTown;
  @Input() allianceDiplomacy: Dict<string>;

  @Output() openAllianceProfile = new EventEmitter();
  @Output() openPlayerProfile = new EventEmitter();
  @Output() openCommand = new EventEmitter();

  public activeTownHex: Hex;

  public mapTiles;
  public rng;

  public ctx: CanvasRenderingContext2D;
  public offscreenCanvas: HTMLCanvasElement;
  public offscreenCtx: CanvasRenderingContext2D;

  public layout = new Layout();
  // TODO: see if repacing map visibility is viable for performance
  // As is visibility compensates for maximum amount, usually rendering more hexes than needed
  // Consider checking max size and choosing amount based on that
  public mapVisibility = {
    x: 1,
    y: 1,
  };
  public hexSize: HexSize;
  public mapSize: Point = { x: 0, y: 0 };
  public offset: Point;
  public hexWidthCount = [{
    count: 5,
    size: 600,
  }, {
    count: 7,
    size: 900,
  }, {
    count: 11,
    size: 1400,
  }, {
    count: 13,
    size: 2000,
  }, {
    count: 19,
    size: 4000,
  }];
  public zoom = {
    current: 1,
    min: 0.25,
    max: 2,
  };
  public elementReady = false;
  public shouldDraw = false;
  public targetCoord: Coords = [null, null];

  public boxSize = {
    x: 260,
    y: 140,
  };
  public dragging = 0;
  public hover;
  public hoverPauser = new Subject();

  public moveEvent: Observable<MouseEvent>;
  public pausableMove = this.hoverPauser.pipe(
    switchMap(paused => paused ? never() : this.moveEvent)
  );
  public hoverSubscription: Subscription;

  constructor(private mapService: MapService) {
    library.add(faHome, faUserCircle, faUsers, faExchangeAlt, faSortAmountUp, faSearch);
    this.mapTiles = this.mapService.mapTiles;
    this.rng = this.mapService.rng;
  }

  /**
   * Toggle draw flag on any changes
   *
   * @param {SimpleChanges} changes
   * @memberof MapCanvasComponent
   */
  public ngOnChanges(changes: SimpleChanges) {
    if (changes.townState) {
      this.activeTownHex = this.layout.coordToHex(this.townState.playerTowns[this.townState.activeTown].location);
    }
    this.shouldDraw = true;
  }

  /**
   * Draw map if conditions met and clear flag
   *
   * @memberof MapCanvasComponent
   */
  public ngAfterViewChecked() {
    if (this.elementReady && this.shouldDraw && this.mapData) {
      this.hoverPauser.next(false);
      this.drawMap(this.layout, this.offset);
      this.shouldDraw = false;
    }
  }

  /**
   * Initialize canvases, map settings, offset and mark element ready
   * Subscribe to move event
   *
   * @memberof MapCanvasComponent
   */
  public ngAfterContentInit() {
    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCtx = this.offscreenCanvas.getContext('2d', { alpha: false });
    this.offscreenCtx.imageSmoothingEnabled = false;
    this.offscreenCtx.lineWidth = 1;
    this.ctx = this.map.nativeElement.getContext('2d', { alpha: false });
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.lineWidth = 1;
    this.setMapSettings({
      x: this.map.nativeElement.offsetWidth,
      y: this.map.nativeElement.offsetHeight,
    });

    const activeTown = this.townState.playerTowns[this.townState.activeTown];
    this.activeTownHex = this.layout.coordToHex(activeTown.location);
    this.setCenterCoordOffset(activeTown.location);
    this.elementReady = true;
    this.shouldDraw = true;
    this.moveEvent = merge(
      fromEvent<MouseEvent>(this.map.nativeElement, 'mousemove'),
      fromEvent<MouseEvent>(this.map.nativeElement, 'touchmove')
    ).pipe(
      throttleTime(50)
    );
    this.hoverSubscription = this.pausableMove.subscribe((data: MouseEvent) => this.onHover(data));
    this.hoverPauser.next(!this.mapData);
    // if (window.devicePixelRatio && window.devicePixelRatio !== 1) {
    //   canvas.style.width = width + 'px';
    //   canvas.style.height = height + 'px';
    //   canvas.width = width * window.devicePixelRatio;
    //   canvas.height = height * window.devicePixelRatio;
    //   ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    // }
  }

  /**
   * Sets layout and map settings
   *
   * @public
   * @param {Point} containerSize
   * @memberof MapCanvasComponent
   */
  public setMapSettings(containerSize: Point) {
    const worldSize = Math.ceil(this.worldData.world.size / 2);
    let hexWidth = this.hexWidthCount[0].count;
    for (let i = 1; i < this.hexWidthCount.length && containerSize.x > this.hexWidthCount[i - 1].size; i++) {
      hexWidth = this.hexWidthCount[i].count;
    }
    const width = containerSize.x / hexWidth * this.zoom.current;
    const size = width / this.layout.orientation.f0;
    const height = size * 2;
    this.hexSize = {
      size,
      width,
      height,
    };
    this.mapVisibility = {
      x: Math.ceil(containerSize.x / width) + 2,
      y: Math.ceil(containerSize.y / (height * 0.75)) + 2,
    };
    this.mapSize = containerSize;

    this.offscreenCanvas.width = containerSize.x;
    this.offscreenCanvas.height = containerSize.y;

    this.layout.size = { x: this.hexSize.size, y: this.hexSize.size };
    this.layout.origin = { x: this.hexSize.width * worldSize, y: this.hexSize.height * 0.75 * worldSize };
    this.layout.centerCoord = worldSize;
  }

  /**
   * Emit open command based on hover data
   *
   * @param {any} event
   * @returns
   * @memberof MapCanvasComponent
   */
  // TODO: test if this works on mobile, since it doesn't do hover events
  public onClick(event) {
    if (!this.hover) { return; }
    this.openCommand.emit(this.hover.data);
  }

  /**
   * Convert event to hex and set hover data accordingly
   *
   * @param {MouseEvent} event
   * @returns
   * @memberof MapCanvasComponent
   */
  public onHover(event: MouseEvent) {
    const origin = { x: event.offsetX, y: event.offsetY };
    const position = {
      x: this.offset.x + origin.x,
      y: this.offset.y + origin.y,
    };
    const hex = this.layout.pixelToHex(position).round();
    const coord = this.layout.hexToCoord(hex);
    const coordString = coord.join(',');
    const town = this.mapData[coordString] || null;

    if (!town || town.id === this.townState.activeTown) {
      this.hover = null;
      return;
    }

    const corners = this.layout.polygonCorners(hex);
    const hoverPos = {
      x: corners[2].x - this.offset.x,
      y: corners[2].y - this.offset.y - this.boxSize.y,
    };
    if (hoverPos.y < 0) {
      hoverPos.y = corners[5].y - this.offset.y;
    }
    if (hoverPos.x + this.boxSize.x > this.mapSize.x) {
      hoverPos.x -= this.boxSize.x;
    }
    this.hover = {
      data: {
        ...town,
        distance: this.activeTownHex.distance(hex),
      },
      position: `translate3d(${+hoverPos.x}px,${hoverPos.y}px,0)`,
      transformOrigin: ''
    };
  }

  /**
   * Updates zoom value and calls a map update
   *
   * @param {WheelEvent} event
   * @returns
   * @memberof MapCanvasComponent
   */
  public onZoom(event: WheelEvent) {
    event.preventDefault();

    const newZoom = (this.zoom.current - Math.sign(event.deltaY) * 0.25);
    const zoom = Math.min(Math.max(newZoom, this.zoom.min), this.zoom.max);
    if (this.zoom.current === zoom) { return; }

    this.zoom.current = zoom;
    this.updateMap({
      x: this.map.nativeElement.offsetWidth,
      y: this.map.nativeElement.offsetHeight,
    });
  }

  /**
   * Captures initial drag position and subscribes to further drag events
   *
   * @param {any} event
   * @memberof MapCanvasComponent
   */
  public onStartDrag(event) {
    const origin = {
      x: event.offsetX || event.touches[0].pageX - event.touches[0].target.offsetLeft,
      y: event.offsetY || event.touches[0].pageY - event.touches[0].target.offsetTop,
    };
    const initialOffset: Point = { x: this.offset.x, y: this.offset.y };
    this.dragging = 1;
    merge(
      fromEvent(this.map.nativeElement, 'mousemove'),
      fromEvent(this.map.nativeElement, 'touchmove')
    ).pipe(
      takeWhile(() => !!this.dragging),
      throttleTime(10),
    )
      .subscribe(data => this.onDrag(origin, data, initialOffset));
  }
  /**
   * Stops drag event listener by setting dragging to 0
   *
   * @param {any} event
   * @memberof MapCanvasComponent
   */
  public onStopDrag(event) {
    this.dragging = 0;
  }

  /**
   * Updates offset and redraws the map
   *
   * @param {Point} origin
   * @param {any} event
   * @param {Point} offset
   * @returns
   * @memberof MapCanvasComponent
   */
  public onDrag(origin: Point, event, offset: Point) {
    const difference = {
      x: (event.offsetX || event.touches[0].pageX - event.touches[0].target.offsetLeft),
      y: (event.offsetY || event.touches[0].pageY - event.touches[0].target.offsetTop),
    };
    const totalDifference = {
      x: origin.x - difference.x,
      y: origin.y - difference.y,
    };
    const change = {
      x: offset.x + totalDifference.x - this.offset.x,
      y: offset.y + totalDifference.y - this.offset.y,
    };

    if (Math.abs(totalDifference.x) < 5 && Math.abs(totalDifference.y) < 5) { return; }

    this.dragging = 2;
    this.hover = null;
    this.offset = {
      x: this.offset.x + change.x,
      y: this.offset.y + change.y,
    };

    // const drags = performance.getEntriesByName('draw drag');
    // if (drags.length === 100) {
    //   console.log(drags);
    //   const times = drags.reduce((result, drag) => {
    //     result.max = Math.max(result.max, drag.duration);
    //     result.min = Math.min(result.min, drag.duration);
    //     result.total += drag.duration;
    //     return result;
    //   }, { total: 0, max: 0, min: Infinity });
    //   times.average = times.total / drags.length;
    //   console.table(times);
    //   return;
    // }

    // performance.mark('draw drag start');
    this.drawMap(this.layout, this.offset, change);
    // performance.mark('draw drag end');
    // performance.measure('draw drag', 'draw drag start', 'draw drag end');
  }

  /**
   * Updates map with new size
   *
   * @param {any} event
   * @memberof MapCanvasComponent
   */
  public onResize(event) {
    this.updateMap({
      x: this.map.nativeElement.offsetWidth,
      y: this.map.nativeElement.offsetHeight,
    });
  }

  /**
   * Updates map settings, recalculates offset from old offset center
   *
   * @param {Point} size
   * @memberof MapCanvasComponent
   */
  public updateMap(size: Point) {
    const currentCenter = this.layout.pixelToHex({
      x: this.offset.x + this.mapSize.x / 2,
      y: this.offset.y + this.mapSize.y / 2,
    });
    this.setMapSettings(size);
    const newCenter = this.layout.hexToPixel(currentCenter);
    newCenter.x -= this.mapSize.x / 2,
    newCenter.y -= this.mapSize.y / 2,

    this.offset = newCenter;
    this.shouldDraw = true;
  }

  /**
   * Sets the offset to target coord and toggles map draw flag
   *
   * @param {Coords} coord
   * @returns
   * @memberof MapCanvasComponent
   */
  public jumpToCoord(coord: Coords) {
    if (coord[0] < 0 || coord[0] > this.worldData.world.size || coord[1] < 0 || coord[1] > this.worldData.world.size) {
      this.targetCoord[0] = null;
      this.targetCoord[1] = null;
      return;
    }
    this.setCenterCoordOffset(coord);
    this.shouldDraw = true;
    this.targetCoord[0] = null;
    this.targetCoord[1] = null;
  }

  /**
   * Sets offsets to be centered on coord
   *
   * @param {Coords} coord
   * @memberof MapCanvasComponent
   */
  public setCenterCoordOffset(coord: Coords) {
    const offset = this.layout.coordToPixel(coord);
    offset.x -= this.mapSize.x / 2 + 15,
    offset.y -= this.mapSize.y / 2 - 50,
    this.offset = offset;
  }

  /**
   * Generates a fullscreen hex array based on current offset
   *
   * @returns {Hex[]}
   * @memberof MapCanvasComponent
   */
  public screenHexes(): Hex[] {
    // Need to compensate for screen size as this is generates at center
    return this.shapeRectangle(this.mapVisibility.x, this.mapVisibility.y, {
      x: this.offset.x + this.mapSize.x / 2,
      y: this.offset.y + this.mapSize.y / 2,
    });
  }

  /**
   * Generates a rectangular hex array, even numbers are shifted towards the left/top
   *
   * @param {number} width rectangle x
   * @param {number} height rectangle y
   * @param {Point} [offset] center hex position
   * @returns {Hex[]}
   * @memberof MapCanvasComponent
   */
  public shapeRectangle(width: number, height: number, offset?: Point): Hex[] {
    const hexes = [];
    const center = !offset ? new Hex(0, 0, 0) : this.layout.pixelToHex(offset).round();
    const i1 = -Math.floor(width / 2);
    const i2 = i1 + width;
    const j1 = -Math.floor(height / 2);
    const j2 = j1 + height;
    for (let j = j1; j < j2; j++) {
      const jOffset = -Math.floor(j / 2);
      for (let i = i1 + jOffset; i < i2 + jOffset; i++) {
        hexes.push(new Hex(i + center.x, j + center.y, -i - j + center.z));
      }
    }
    return hexes;
  }

  /**
   * Draws generated hexes to canvas. Generation is based on change property. If change is missing hexes are
   * generated to cover a fullscreen. If it's offsets the current map and generates hexes only to cover changes.
   *
   * @param {Layout} layout
   * @param {Point} offset
   * @param {Point} [change]
   * @param {boolean} [labels=false]
   * @memberof MapCanvasComponent
   */
  public drawMap(layout: Layout, offset: Point, change?: Point, labels: boolean = false) {
    let hexes: Hex[];
    if (change) {
      // Draw old map ofset by the change value
      this.offscreenCtx.drawImage(this.offscreenCanvas, -change.x, -change.y);
      hexes = [];
      if (change.x) {
        const xOffset = change.x > 0 ? this.mapSize.x - change.x : -change.x;
        const width = Math.max(Math.ceil(Math.abs(change.x) / (this.hexSize.width / 2)), 2);
        hexes.push(...this.shapeRectangle(
          width,
          this.mapVisibility.y,
          { x: offset.x + xOffset, y: offset.y + this.mapSize.y / 2 }
        ));
      }
      if (change.y) {
        const yOffset = change.y > 0 ? this.mapSize.y - change.y : -change.y;
        const height = Math.max(Math.ceil(Math.abs(change.y) / this.hexSize.size), 3);
        hexes.push(...this.shapeRectangle(
          this.mapVisibility.x,
          height,
          { x: offset.x + this.mapSize.x / 2, y: offset.y + yOffset }
        ));
      }
      // TODO: consider refactoring to generate less hexes instead of filtering down the line
      // Remove duplicate hexes if both x and y coords have changed
      if (change.x && change.y) {
        const hexMap = hexes.reduce((result, hex) => {
          result.set(hex.toString(), hex);
          return result;
        }, new Map());
        hexes = Array.from(hexMap.values());
      }
    } else {
      hexes = this.screenHexes();
    }
    hexes.forEach((hex) => this.drawHex(this.offscreenCtx, layout, hex, labels));
    this.ctx.drawImage(this.offscreenCanvas, 0, 0, this.mapSize.x, this.mapSize.y);
  }

  /**
   * Draws the specified hex to canvas
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {Layout} layout
   * @param {Hex} hex
   * @param {boolean} [label=false]
   * @param {string} [stroke='#27ae60']
   * @memberof MapCanvasComponent
   */
  public drawHex(ctx: CanvasRenderingContext2D, layout: Layout, hex: Hex, label: boolean = false, stroke: string = '#27ae60') {
    const corners = layout.polygonCorners(hex, this.offset);

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(corners[5].x, corners[5].y);
    for (let i = 0; i < 6; i++) {
        ctx.lineTo(corners[i].x, corners[i].y);
    }
    const coord = layout.hexToCoord(hex);
    const hexImage = [
      corners[3].x,
      corners[2].y,
    ];
    const coordString = coord.join(',');
    const town = this.mapData[coordString];
    const image = this.mapTiles.tiles[Math.round(this.mapService.rng(coordString) * (this.mapTiles.tiles.length - 1))];

    ctx.closePath();
    if (town) {
      const townImage = town.owner ? this.mapTiles.object : this.mapTiles.objectType.abandoned;
      ctx.drawImage(
        this.mapTiles.image,
        townImage[0], townImage[1],
        this.mapTiles.size[0], this.mapTiles.size[1],
        hexImage[0], hexImage[1],
        this.hexSize.width, this.hexSize.height,
      );

      // Check if a player town or has related alliance diplomacy
      let type;
      if (this.townState.ids.includes(town.id)) {
        type = this.townState.activeTown === town.id ? this.mapTiles.objectType.ownedActive : this.mapTiles.objectType.owned;
      } else if (this.allianceDiplomacy && town.alliance && this.allianceDiplomacy[town.alliance.id]) {
        const target = this.allianceDiplomacy[town.alliance.id];
        type = this.mapTiles.objectType[target[0]];
      }

      // Draw additional markings
      if (type) {
        ctx.drawImage(
          this.mapTiles.image,
          type[0], type[1],
          this.mapTiles.size[0], this.mapTiles.size[1],
          hexImage[0], hexImage[1],
          this.hexSize.width, this.hexSize.height,
        );
      }
    } else {
      ctx.drawImage(
        this.mapTiles.image,
        image[0], image[1],
        this.mapTiles.size[0], this.mapTiles.size[1],
        hexImage[0], hexImage[1],
        this.hexSize.width, this.hexSize.height,
      );
    }

    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.stroke();
    }

    if (label) {
      ctx.fillStyle = 'hsl(0, 0%, 100%)';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(coordString, corners[2].x, (corners[2].y + corners[5].y) / 2);
    }
  }
}
