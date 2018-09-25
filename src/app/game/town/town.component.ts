// TODO: refactor some town elements in to simple presentation components

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { getActiveWorld } from '../../reducers';
import { GameModuleState, getFullTown } from '../reducers';
import { Rename, Build } from '../town/town.actions';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'town',
  templateUrl: './town.component.html',
  styleUrls: ['./town.component.scss'],
})

export class TownComponent implements OnInit, OnDestroy {
  private nameChange = '';
  public town$ = this.store.select(getFullTown);
  public worldData$ = this.store.select(getActiveWorld);

  constructor(
    private store: Store<GameModuleState>,
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
