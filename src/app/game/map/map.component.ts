import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import * as Konva from 'konva';
import * as seedrandom from 'seedrandom';

console.log(seedrandom);
@Component({
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.scss'],
})
export class MapComponent implements OnInit {
  private target;

  private stage;
  private layer;
  private width;
  private height;
  private side;
  private radius;
  private aHeight;
  private hexHeight;

  constructor(private el: ElementRef, private renderer: Renderer) {
  //   renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
  //   setTimeout(() => {
  //     console.log(this.width, this.height, this.side, this.radius, this.aHeight, this.hexHeight)
  //   }, 5000)
    // console.log(this.el);
  }

  ngOnInit() {
    this.target = this.el.nativeElement;
    // const size = [this.target.offsetWidth, this.target.offsetHeight];
    const size = [800, 450];
    this.stage = new Konva.Stage({
      container: this.target,
      width: size[0],
      height: size[1],
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.initMap(size, { x: 0, y: 0 });
  }

  initMap(screen, pos) {
    this.width = screen[0] / 9;
    this.side = this.width / Math.sqrt(3);
    this.height = 2 * this.side;
    this.radius = this.width / 2;
    this.aHeight = this.height * 0.75;
    this.hexHeight = this.side / 2;
    const points = [
      { x: this.width / 2, y: 0 },
      { x: this.width, y: this.side / 2 },
      { x: this.width, y: this.height * 0.75 },
      { x: this.width / 2, y: this.height },
      { x: 0, y: this.height * 0.75 },
      { x: 0, y: this.side /2 }
    ];

    const imgs = [
      '../../../../images/grass.png',
      '../../../../images/grass2.png',
      '../../../../images/grass3.png',
      '../../../../images/grass4.png',
      '../../../../images/grass5.png',
      '../../../../images/grass6.png',
      '../../../../images/grass7.png',
      '../../../../images/restaurant.png',
    ];
    let images = [];
    this.imgPreload(imgs, ims => {
      images = ims;
      console.log('loading done', images)
      this.drawBoard(screen, this.pixelsToHex(pos, this.width, this.height), images)
    });
  }

  pixelsToHex(pos, width, height) {
    let yHex = pos.y / height;
    yHex += 0.25 * Math.floor(pos.y / (height * 0.75) - 0.25);
    const xHex = pos.x / width;
    const x = Math.floor(xHex);
    const y = Math.floor(yHex);
    let yOffset = - (yHex % 1) * height;
    if (yHex < 0) {
      yOffset -= 1 * height;
    }
    return {
      y,
      x,
      yOffset,
      xOffset: - (xHex % 1) * width,
    }
  }

  drawBoard(screen, topSide, images) {
    console.log(topSide);
    let fillY, fillX = fillY = true;
    let activeHexes = {};
    for (let i = 0; fillY; ++i) {
      const y = i * this.aHeight + topSide.yOffset;
      fillY = y + this.aHeight < screen[1];
      fillX = true;
      for (let j = 0; fillX; ++j) {
        const offset = (i + topSide.y) % 2 * this.radius;
        const pos = j * this.width - offset + topSide.xOffset;
        const x = pos;
        fillX = x + this.width < screen[0];
        const xH = j + topSide.x;
        const yH = i + topSide.y;
        activeHexes[`${xH},${yH}`] = { x, y };
        this.drawHexagon(x, y, images[Math.round(Math.random() * (images.length - 1))], xH, yH);
      }
    }
    this.layer.draw();
    // interaction.draw();
  }

  drawHexagon(x, y, img, hx, hy) {
    const parameters = {
      x: x + this.width / 2,
      y: y + this.height / 2,
      sides: 6,
      radius: this.side
    };
    const hexagon = new Konva.RegularPolygon(Object.assign({
      fillPatternImage: img,
      fillPatternRepeat: 'no-repeat',
      fillPatternOffset: { x: this.width / 1.5, y: this.height / 1.75 },
      fillPatternScale: { x: 0.75, y: 0.75 },
      stroke: 'rgba(0,0,0,0.4)',
      strokeWidth: 1,
    }, parameters));
    const hexInt = new Konva.RegularPolygon(parameters);
    hexagon.on('click', e => {
      e.target.setFill('rgba(0, 255, 0, 0.2)');
      // e.target.setStrokeWidth(4);
      this.layer.draw();
    })
    hexagon.x = hx;
    hexagon.y = hy;
    this.layer.add(hexagon);
    // interaction.add(hexInt)
  }

  imgPreload(imgs, cb) {
    const images = [];
    let loaded = 0;
    imgs = Object.prototype.toString.apply(imgs) === '[object Array]' ? imgs : [imgs];
    const inc = function() {
      loaded += 1;
      if (loaded === imgs.length && cb) {
        cb(images);
      }
    };
    for (let i = 0; i < imgs.length; i++) {
      images[i] = new Image();
      images[i].onabort = inc;
      images[i].onerror = inc;
      images[i].onload = inc;
      images[i].src = imgs[i];
    }
  }

}
