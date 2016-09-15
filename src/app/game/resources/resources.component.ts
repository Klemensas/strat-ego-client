import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'resources',
  templateUrl: 'resources.component.html',
  styleUrls: ['resources.component.scss'],
  inputs: ['res']
})
export class ResourcesComponent implements OnInit {
  res;

  constructor() { }

  ngOnInit() {
  }

}
