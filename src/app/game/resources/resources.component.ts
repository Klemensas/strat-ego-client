import { Component, Input, OnChanges } from '@angular/core';
import { Resources } from 'strat-ego-common';
import { Observable } from 'rxjs/observable';

import { availableResources } from '../utils';
import { Town } from '../town/town.model';

@Component({
  selector: 'resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnChanges {
  @Input() public town: Town;
  availableResources$: Observable<Resources>;

  ngOnChanges() {
    this.availableResources$ = availableResources(this.town);
  }
}
