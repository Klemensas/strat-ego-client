import { Component, OnChanges, ViewChild, ElementRef, AfterContentInit, Input } from '@angular/core';
import { MapTown, Dict } from 'strat-ego-common';
import { Point, Layout } from '../../../services/map.service';
import { TownState } from '../../../town/town.reducer';

// TODO: current minimap isn't working properly. Root issue is full sized map being too small as minimap
// Consider implementing minimap scrolling
@Component({
  selector: 'minimap',
  templateUrl: './minimap.component.html',
  styleUrls: ['./minimap.component.scss']
})
export class MinimapComponent implements OnChanges, AfterContentInit {
  @ViewChild('minimap') public minimap: ElementRef;
  @Input() townState: TownState;
  @Input() allianceDiplomacy: Dict<string>;
  @Input() mapData: MapTown;
  @Input() mapViewSize: Point;
  @Input() mapOffset: Point;
  @Input() hexSize;
  @Input() centerCoord: number;

  public layout = new Layout({ x: 0, y: 0 });

  public ctx: CanvasRenderingContext2D;
  public minimapSize: Point = { x: 0, y: 0 };
  public viewOffset: Point = { x: 0, y: 0 };
  public viewArea: Point = { x: 0, y: 0 };
  public minimapMultiplier = 8;
  public mapSize: Point;
  public minimapSizeRatio: Point;

  // public shouldDraw = false;

  constructor() { }

  public ngAfterContentInit() {
    this.ctx = this.minimap.nativeElement.getContext('2d');
    this.minimapSize.x = this.minimap.nativeElement.offsetWidth;
    this.minimapSize.y = this.minimap.nativeElement.offsetHeight;
    const worldSize = this.centerCoord * 2 * (1 / this.minimapMultiplier);
    const size = this.minimapSize.x / worldSize;
    this.layout.size = {
      x: size,
      y: size,
    };
    this.layout.centerCoord = this.centerCoord;
    this.layout.origin = {
      x: this.minimapSize.x / 2,
      y: this.minimapSize.y / 2,
    };
    console.log('hello', this.mapData, this.minimapSize, size);
    this.mapSize = {
      x: this.hexSize.width * (this.centerCoord * 2 - 1),
      y: this.hexSize.height * (this.centerCoord * 2 - 1),
    };
    this.minimapSizeRatio = {
      x: this.minimapSize.x / this.mapSize.x * this.minimapMultiplier,
      y: this.minimapSize.y / this.mapSize.y * this.minimapMultiplier,
    };
    this.viewOffset = {
      x: this.mapOffset.x * this.minimapSizeRatio.x / this.minimapMultiplier,
      y: this.mapOffset.y * this.minimapSizeRatio.y / this.minimapMultiplier,
    };
    this.viewArea = {
      x: this.mapViewSize.x * this.minimapSizeRatio.x,
      y: this.mapViewSize.y * this.minimapSizeRatio.y,
    };
    // console.log('change...', this.minimapSizeRatio, this.viewOffset, this.viewArea, mapSize);

    setTimeout(() => {

      this.drawMinimap();
    });
  }

  public ngOnChanges(changes) {
    this.mapSize = {
      x: this.hexSize.width * (this.centerCoord * 2 - 1),
      y: this.hexSize.height * (this.centerCoord * 2 - 1),
    };
    this.minimapSizeRatio = {
      x: this.minimapSize.x / this.mapSize.x * this.minimapMultiplier,
      y: this.minimapSize.y / this.mapSize.y * this.minimapMultiplier,
    };
    this.viewOffset = {
      x: this.mapOffset.x * this.minimapSizeRatio.x / this.minimapMultiplier,
      y: this.mapOffset.y * this.minimapSizeRatio.y / this.minimapMultiplier,
    };
    this.viewArea = {
      x: this.mapViewSize.x * this.minimapSizeRatio.x,
      y: this.mapViewSize.y * this.minimapSizeRatio.y,
    };
    console.log('update', this.viewArea, this.viewOffset);
  }

  public drawMinimap() {
      this.ctx.strokeStyle = '#27ae60';
      this.ctx.lineWidth = 1;
      Object.entries(this.mapData).forEach(([location, town]) => {
        let fillColor = '#423f3f';
        if (this.townState.playerIds.includes(town.id)) {
          fillColor = this.townState.activeTown === town.id ? 'yellow' : 'white';
        } else if (town.owner) {
          fillColor = 'red';
        }

        const position = this.layout.coordToPixel(town.location);
        const corners = this.layout.polygonCorners(position);
        this.ctx.fillStyle = fillColor;
        this.ctx.beginPath();
        this.ctx.moveTo(corners[5].x, corners[5].y);
        for (let i = 0; i < 6; i++) {
          this.ctx.lineTo(corners[i].x, corners[i].y);
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
  // console.log('corners', corners)
      // const coord = layout.hexToCoord(hex);

        // console.log('cool', location, coord);
      });
    // this.ctx.fillStyle = '#27ae60';
    // this.ctx.fillRect(0, 0, this.minimapSize.x, this.minimapSize.y)
  }
}
