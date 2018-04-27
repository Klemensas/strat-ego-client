import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TownSupport, Unit } from 'strat-ego-common';

@Component({
  selector: 'support-item',
  templateUrl: './support-item.component.html',
  styleUrls: ['./support-item.component.scss']
})
export class SupportItemComponent {
  @Input() support: TownSupport;
  @Input() isOrigin: boolean;
  @Input() unitList: Unit[] = [];
  @Output() cancelSupport: EventEmitter<number> = new EventEmitter();
}
