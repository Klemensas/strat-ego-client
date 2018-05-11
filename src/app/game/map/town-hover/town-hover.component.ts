import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'town-hover',
  templateUrl: './town-hover.component.html',
  styleUrls: ['./town-hover.component.scss']
})
export class TownHoverComponent {
  @Input() data;
  @Output() openAllianceProfile = new EventEmitter();
}
