import { Component, OnChanges, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Alliance, AllianceDiplomacy, DiplomacyStatus, DiplomacyType } from 'strat-ego-common';

import { GameModuleState } from '../../reducers';
import {
  AcceptNap,
  DeclareWar,
  ProposeNap,
  ProposeAlliance,
  CancelAlliance,
  CancelNap,
  RejectAlliance,
  AcceptAlliance,
  EndAlliance,
  RejectNap,
  EndNap
} from '../alliance.actions';

@Component({
  selector: 'alliance-diplomacy',
  templateUrl: './alliance-diplomacy.component.html',
  styleUrls: ['./alliance-diplomacy.component.scss']
})
export class AllianceDiplomacyComponent implements OnChanges {
  @Input() alliance: Alliance;
  reason = '';
  allianceTargetName = '';
  napTargetName = '';
  warTargetName = '';
  alliances: AllianceDiplomacy[] = [];
  wars: AllianceDiplomacy[] = [];
  naps: AllianceDiplomacy[] = [];
  diplomacyStatus = DiplomacyStatus;

  constructor(private store: Store<GameModuleState>) { }

  ngOnChanges() {
    const diplomacy = [...this.alliance.diplomacyOrigin, ...this.alliance.diplomacyTarget]
      .sort((a, b) => +a.updatedAt - +b.updatedAt)
      .reduce((result, item) => {
        result[DiplomacyType[item.type]].push(item);
        return result;
      }, {
        war: [],
        alliance: [],
        nap: [],
      });
    this.alliances = diplomacy.alliance;
    this.wars = diplomacy.war;
    this.naps = diplomacy.nap;
  }

  declareWar() {
    this.store.dispatch(new DeclareWar({
      targetName: this.warTargetName,
      reason: this.reason
    }));
    this.warTargetName = '';
    this.reason = '';
  }

  proposeAlliance() {
    this.store.dispatch(new ProposeAlliance(this.allianceTargetName));
    this.allianceTargetName = '';
  }

  cancelAlliance(id: number) {
    this.store.dispatch(new CancelAlliance(id));
  }

  rejectAlliance(id: number) {
    this.store.dispatch(new RejectAlliance(id));
  }

  acceptAlliance(id: number) {
    this.store.dispatch(new AcceptAlliance(id));
  }

  endAlliance(id: number) {
    this.store.dispatch(new EndAlliance(id));
  }

  proposeNap() {
    this.store.dispatch(new ProposeNap(this.napTargetName));
    this.napTargetName = '';
  }

  cancelNap(id: number) {
    this.store.dispatch(new CancelNap(id));
  }

  rejectNap(id: number) {
    this.store.dispatch(new RejectNap(id));
  }

  acceptNap(id: number) {
    this.store.dispatch(new AcceptNap(id));
  }

  endNap(id: number) {
    this.store.dispatch(new EndNap(id));
  }

  negotiatePeace(payload) {
  }
}
