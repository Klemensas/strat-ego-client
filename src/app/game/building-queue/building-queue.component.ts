import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { timestamp, map } from 'rxjs/operators';
import { BuildingQueue } from 'strat-ego-common';

import { buildingData } from '../staticData';

@Component({
  selector: 'building-queue',
  templateUrl: './building-queue.component.html',
  styleUrls: ['./building-queue.component.scss']
})
export class BuildingQueueComponent implements OnInit, OnChanges {
  @Input() public buildingQueue: BuildingQueue[] = [];

  public queue$: Observable<any>;
  public buildingDetails = buildingData;

  public ngOnInit() {
    this.queue$ = Observable.timer(0, 1000).pipe(
      timestamp(),
      map((time) => this.buildingQueue.map((queue) => ({
        ...queue,
        timeLeft: +queue.endsAt - time.timestamp,
      })))
    );
  }

  public ngOnChanges(changes) {
    // const time = Date.now();
    // this.buildingQueue.map((queue) => ({
    //   ...queue,
    //   timeLeft:
    // }))
  }
}
