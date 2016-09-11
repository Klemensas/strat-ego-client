import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'resources',
  templateUrl: 'resources.component.html',
  styleUrls: ['resources.component.css'],
  inputs: ['res']
})
export class ResourcesComponent implements OnInit {
  res;

  constructor() { }

  ngOnInit() {
  }

}
