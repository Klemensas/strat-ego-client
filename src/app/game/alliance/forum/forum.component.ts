import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Alliance, AlliancePermissions } from 'strat-ego-common';

import { GameModuleState } from '../../../store/index';
import { AllianceActions } from '../../../store/alliance/alliance.actions';

@Component({
  selector: 'forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  @Input() alliance: Alliance;
  @Input() permissions: AlliancePermissions;

  private categoryName = '';
  private categoryDesc = '';

  constructor(private store: Store<GameModuleState>) { }

  ngOnInit() {
  }

  createCategory() {
    // this.store.dispatch({ type: AllianceActions.CREATE_FORUM_CATEGORY, payload: {
    //   name: this.categoryName,
    //   description: this.categoryDesc
    // } })
  }
}
