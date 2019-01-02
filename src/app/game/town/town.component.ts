// TODO: refactor some town elements in to simple presentation components

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { getActiveWorld } from '../../reducers';
import { GameModuleState, getFullTown } from '../reducers';
import { Rename, Build } from '../town/town.actions';

@Component({
  selector: 'town',
  templateUrl: './town.component.html',
  styleUrls: ['./town.component.scss'],
})

export class TownComponent {
  nameChange = '';
  town$ = this.store.select(getFullTown);
  worldData$ = this.store.select(getActiveWorld);

  constructor(private store: Store<GameModuleState>) {}

  rename(name: string, oldName: string, town: number) {
    if (name.length > 3 && name !== oldName) {
      this.store.dispatch(new Rename({ name, town }));
    }
  }

  build(building) {
    this.store.dispatch(new Build(building));
  }
}
