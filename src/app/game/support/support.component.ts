import { Component, Input } from '@angular/core';
import { Town } from '../town/town.model';
import { World } from 'strat-ego-common';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { RecallSupport, SendBackSupport } from '../town/town.actions';

@Component({
  selector: 'support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {
  @Input() town: Town;
  @Input() worldData: World;

  constructor(private store: Store<State>) { }

  recallSupport(support: number) {
    this.store.dispatch(new RecallSupport({ town: this.town.id, support }));
  }

  sendBackSupport(support: number) {
    this.store.dispatch(new SendBackSupport({ town: this.town.id, support }));
  }

}
