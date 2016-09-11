import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import * as Konva from 'konva';

@Directive({
  selector: '[map]'
})
export class Map {
  private stage;
  private layer;

  constructor(private el: ElementRef, private renderer: Renderer) {
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');

    this.stage = new Konva.Stage({
      container: el.nativeElement,
      width: 400,
      height: 400,
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
  }


}
