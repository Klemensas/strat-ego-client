// TODO: refactor some town elements in to simple presentation components

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/timer';

import { GameDataService } from '../../services/game-data.service';
import { SocketService } from '../services';
import { GameModuleState, getActiveTown } from '../../store';
import { TownActions, Rename, Build } from '../../store/town/town.actions';
import { getActiveWorld } from '../../reducers';
import { Town } from '../../store/town/town.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'town',
  templateUrl: './town.component.html',
  styleUrls: ['./town.component.scss'],
})

export class TownComponent implements OnInit, OnDestroy {
  private nameChange = '';
  public town$ = this.store.select(getActiveTown)
  public worldData$ = this.store.select(getActiveWorld);

  constructor(
    private socket: SocketService,
    private gameDataService: GameDataService,
    private store: Store<GameModuleState>
  ) {}

  public ngOnInit() {
    // Subscribe to town data updates
    // this.store.select(getActiveTown).subscribe((town) => {
    //   this.town = town as any;
    // })
    // this.townObserver = this.townService.currentTown.subscribe(update => {
    //   console.log('hmm', update)
    //   this.town = update;
    // });
  }

  public rename(targetName, oldName) {
    if (targetName.length > 3 && targetName !== oldName) {
      this.store.dispatch(new Rename(targetName));
    }
  }

  public build(building) {
    this.store.dispatch(new Build(building));
  }


  ngOnDestroy() {
    // this.townObserver.unsubscribe();
  }
}
