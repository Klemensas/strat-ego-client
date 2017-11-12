// TODO: refactor some town elements in to simple presentation components

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { GameDataService } from '../../services/game-data.service';
import { SocketService, PlayerService, TownService } from '../services';
import { StoreState } from '../../store';
import { getActiveTown, TownActions, Town } from '../../store/town';
import { getActiveWorld } from '../../store/world';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'town',
  templateUrl: './town.component.html',
  styleUrls: ['./town.component.scss'],
})

export class TownComponent implements OnInit, OnDestroy {
  private nameChange = '';
  public town$ = this.store.select(getActiveTown);
  public worldData$ = this.store.select(getActiveWorld);

  constructor(
    private socket: SocketService,
    private playerService: PlayerService,
    private townService: TownService,
    private gameDataService: GameDataService,
    private store: Store<StoreState>
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

  public changeName(targetName, oldName) {
    if (targetName.length > 3 && targetName !== oldName) {
      this.store.dispatch({ type: TownActions.CHANGE_NAME, payload: targetName });
    }
  }

  public upgradeBuilding(building) {
    this.store.dispatch({ type: TownActions.UPGRADE_BUILDING, payload: building });
  }


  ngOnDestroy() {
    // this.townObserver.unsubscribe();
  }
}
