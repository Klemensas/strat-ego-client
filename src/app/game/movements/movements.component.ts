import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { timestamp, map } from 'rxjs/operators';

import { Town } from '../../store/town/town.model';
import { MovementTypeName } from 'strat-ego-common';

@Component({
  selector: 'movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit, OnChanges {
  @Input() public town: Town;
  @Input() public worldData;

  public typeNames = MovementTypeName;
  public movements = [];
  public queue$: Observable<any>;
  public outgoing = [];
  public incoming = [];
  public returning = [];
  public unitTypes = [];

  ngOnInit() {
    const b = this.typeNames[0];
    this.queue$ = Observable.timer(0, 1000).pipe(
      timestamp(),
      map((time) => this.movements.map(queue => {
        queue.timeLeft = +queue.endsAt - time.timestamp;
        return queue;
      }))
    );
    // this.gameData.data.activeWorld.subscribe(world => {
    //   // this.worldData = world;
    //   this.unitTypes  = world.units;
    //   console.log('woosh', world, this.unitTypes);
    //   // this.buildingData = world.buildingData;
    //   // this.buildingList = Object.keys(world.buildingData);
    // });
  // }
    // this.townService.currentTown.subscribe(town => {
    //   if (town) {
    //     console.log('update', town)
    //     this.outgoing = town.MovementOriginTown;
    //     // TODO: separate incoming into attacks and returning
    //     this.incoming = town.MovementDestinationTown;
    //   }
    // });
  }

  ngOnChanges(changes) {
    this.movements = [...this.town.originMovements, ...this.town.targetMovements].sort((a, b) => +a.endsAt - +b.endsAt );
  }
}
