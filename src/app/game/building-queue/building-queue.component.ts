import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/timestamp';

import { buildingData } from '../staticData';

@Component({
  selector: 'building-queue',
  templateUrl: './building-queue.component.html',
  styleUrls: ['./building-queue.component.scss']
})
export class BuildingQueueComponent implements OnInit, OnChanges {
  @Input() public buildingQueue = [];

  public queue$: Observable<any>;
  public buildingDetails = buildingData;

  public ngOnInit() {
    this.queue$ = Observable.timer(0, 1000)
      .timestamp()
      .map(({ timestamp }) => this.buildingQueue.map((queue) => ({
        ...queue,
        timeLeft: new Date(queue.endsAt).getTime() - timestamp,
      })));
  }

  public ngOnChanges(changes) {
    // const time = Date.now();
    // this.buildingQueue.map((queue) => ({
    //   ...queue,
    //   timeLeft:
    // }))
  }
}
