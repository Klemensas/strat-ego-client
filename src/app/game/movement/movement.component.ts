import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { timestamp, map } from 'rxjs/operators';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

import { Town } from '../town/town.model';
import { MovementTypeName, Movement } from 'strat-ego-common';

@Component({
  selector: 'movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent implements OnInit, OnChanges {
  @Input() public town: Town;
  @Input() public worldData;

  public queueTypeColors = ['warn', 'primary', 'accent'];
  public typeNames = MovementTypeName;
  public movements = [];
  public queue$: Observable<Array<Partial<Movement>>>;
  public outgoing = [];
  public incoming = [];
  public returning = [];
  public unitTypes = [];

  constructor() {
    library.add(faCaretRight, faAngleDoubleLeft);
  }

  ngOnInit() {
    this.queue$ = timer(0, 1000).pipe(
      timestamp(),
      map((time) => this.movements.map(queue => {
        queue.timeLeft = +queue.endsAt - time.timestamp;
        return queue;
      }))
    );
  }

  trackById(index: number, queue: Partial<Movement>) {
    return queue.id;
  }

  ngOnChanges(changes) {
    this.movements = [...this.town.originMovements, ...this.town.targetMovements].sort((a, b) => +a.endsAt - +b.endsAt );
  }
}
