import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GameDataService } from '../../services/game-data.service';
import { MapService } from '../services';

@Component({
  selector: 'movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit, OnChanges {
  @Input() public town;
  @Input() public worldData;

  public movements = [];
  public queue$: Observable<any>;
  public outgoing = [];
  public incoming = [];
  public returning = [];
  public unitTypes = [];
  constructor(private gameData: GameDataService, private mapService: MapService) {
    console.log(mapService);
  }

  ngOnInit() {
    this.queue$ = Observable.timer(0, 1000)
      .timestamp()
      .map(({ timestamp }) => this.movements.map(queue => {
        queue.timeLeft = new Date(queue.endsAt).getTime() - timestamp;
        return queue;
      }));
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
    this.movements = [...this.town.MovementOriginTown, ...this.town.MovementDestinationTown].sort((a, b) =>
      new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime() )
  }
}
