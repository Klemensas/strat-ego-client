import { Component, OnInit } from '@angular/core';
import { Map } from '../directives/map.directive';

@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  directives: [Map]
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
