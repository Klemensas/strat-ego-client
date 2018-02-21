import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, timestamp } from 'rxjs/operators';

import { unitData } from '../staticData';

@Component({
  selector: 'unit-queue',
  templateUrl: './unit-queue.component.html',
  styleUrls: ['./unit-queue.component.scss']
})
export class UnitQueueComponent implements OnInit, OnChanges {
  @Input() public unitQueue = [];

  public queue$: Observable<any>;
  public unitDetails = unitData;

  public ngOnInit() {
    this.queue$ = Observable.timer(0, 1000).pipe(
      timestamp(),
      map(({ timestamp }) => this.unitQueue.map((queue) => ({
        ...queue,
        timeLeft: new Date(queue.endsAt).getTime() - timestamp,
      })))
    );
  }

  public ngOnChanges(changes) {
    // const time = Date.now();
    // this.unitQueue.map((queue) => ({
    //   ...queue,
    //   timeLeft:
    // }))
  }
}
