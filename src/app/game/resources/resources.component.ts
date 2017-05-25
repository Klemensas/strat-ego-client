import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
  inputs: ['resources', 'production', 'maxRes']
})
export class ResourcesComponent implements OnInit {
  resources;
  production;
  maxRes;

  constructor() { }

  ngOnInit() {
  }

}
