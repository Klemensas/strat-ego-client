import { Component, Input } from '@angular/core';

import { Town } from '../../store/town';

@Component({
  selector: 'resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent {
  @Input() public town: Town;
  constructor() { }
}
