import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { State } from '../../reducers';
import { Create } from './message.actions';
import { getPageList, getList, getPlayerEntities } from '../reducers';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  isComposing = false;

  playerProfiles$ = this.store.select(getPlayerEntities);
  pagedThreads$ = this.store.pipe(
    select(getPageList, 0),
  );
  threadData$ = combineLatest(this.pagedThreads$)

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  onSendMessage(event) {
    this.store.dispatch(new Create(event));
  }
}
