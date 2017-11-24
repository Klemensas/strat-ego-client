import { Component, Input } from '@angular/core';
import { Town } from 'app/store/town/town.model';

@Component({
  selector: 'resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent {
  @Input() public town: Town;
  constructor() { }
}
