import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'restaurant',
  templateUrl: 'restaurant.component.html',
  styleUrls: ['restaurant.component.css'],
  inputs: ['restData']
})
export class RestaurantComponent implements OnInit {
  constructor() {
    console.log(this['restData'])
  }

  ngOnInit() { }

}
