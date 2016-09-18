import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'resources',
  templateUrl: 'resources.component.html',
  styleUrls: ['resources.component.scss'],
  inputs: ['resources', 'production']
})
export class ResourcesComponent implements OnInit {
  resources;
  production;

  constructor() { }

  ngOnInit() {
  }

}
