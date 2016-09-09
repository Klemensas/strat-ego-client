import { Component, OnInit } from '@angular/core';

import { ResourcesComponent } from '../resources';

@Component({
  moduleId: module.id,
  selector: 'restaurant',
  templateUrl: 'restaurant.component.html',
  styleUrls: ['restaurant.component.css'],
  inputs: ['restData'],
  directives: [ResourcesComponent]
})
export class RestaurantComponent implements OnInit {
  restData;
  resources = {};

  constructor() {
  }

  ngOnInit() {
    // this.manageResources(this.restData.resources);
  }

  manageResources(res) {
    Object.keys(res).forEach(r => {
      this.resources[r] = ++res[r];
    });

    setTimeout(() => this.manageResources(res), 1000);
  }

}
