import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/timestamp';

import { Resources } from '../../store/world';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit {
  @Input() public resources: Resources;
  @Input() public production: Resources;
  @Input() public maxRes: number = Infinity;
  @Input() public lastUpdate: string;

  public availableResources$;

  constructor() { }

  public ngOnInit() {
    this.updateResources();
  }

  public updateResources() {
    this.availableResources$ = Observable.timer(1000, 1000)
      .timestamp()
      .map(({ timestamp }) => {
        const hoursPast = (timestamp - +(new Date(this.lastUpdate))) / 3600000;
        return {
          wood: Math.min(this.resources['wood'] + this.production['wood'] * hoursPast, this.maxRes || Infinity),
          clay: Math.min(this.resources['clay'] + this.production['clay'] * hoursPast, this.maxRes || Infinity),
          iron: Math.min(this.resources['iron'] + this.production['iron'] * hoursPast, this.maxRes || Infinity),
        };
      }
    );
  }

}
