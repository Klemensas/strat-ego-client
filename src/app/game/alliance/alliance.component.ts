import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreState } from 'app/store';
import { getPlayerAlliance, getPlayerInvitations } from 'app/store/alliance/alliance.selectors';
import { AllianceActions } from 'app/store/alliance/alliance.actions';

@Component({
  selector: 'alliance',
  templateUrl: './alliance.component.html',
  styleUrls: ['./alliance.component.scss'],
})
export class AllianceComponent implements OnInit {
  public playerAlliance$ = this.store.select(getPlayerAlliance);
  public invitations$ = this.store.select(getPlayerInvitations);
  public allianceName = '';

  constructor(private store: Store<StoreState>) { }

  ngOnInit() {
  }

  createAlliance() {
    if (this.allianceName.length > 3) {
      this.store.dispatch({ type: AllianceActions.CREATE, payload: this.allianceName });
    }
  }

  acceptInvite(alliance) {
    this.store.dispatch({ typeL})
  }
}
