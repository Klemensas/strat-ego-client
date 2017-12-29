import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreState } from 'app/store';
import { getPlayerAlliance, getPlayerInvitations } from 'app/store/alliance/alliance.selectors';
import { AllianceActions } from 'app/store/alliance/alliance.actions';
import { getPlayerAllianceRoleName } from 'app/store/player/player.selectors';

@Component({
  selector: 'alliance',
  templateUrl: './alliance.component.html',
  styleUrls: ['./alliance.component.scss'],
})
export class AllianceComponent implements OnInit {
  public playerAllianceData$ = this.store.select(getPlayerAllianceRoleName);
  public playerAlliance$ = this.store.select(getPlayerAlliance);
  public invitations$ = this.store.select(getPlayerInvitations);
  public allianceData$ = this.playerAllianceData$
    .combineLatest(this.playerAlliance$)
    .map(([{ role, name }, alliance]) => ({ role, name, alliance }));
  public allianceName = '';
  public inviteTarget = '';

  constructor(private store: Store<StoreState>) { }

  ngOnInit() {
  }

  createAlliance() {
    if (this.allianceName.length > 3) {
      this.store.dispatch({ type: AllianceActions.CREATE, payload: this.allianceName });
    }
  }

  acceptInvite(alliance) {
    this.store.dispatch({ type: AllianceActions.ACCEPT_INVITE, payload: alliance });
  }

  rejectInvite(alliance) {
    this.store.dispatch({ type: AllianceActions.REJECT_INVITE, payload: alliance });
  }


  sendInvite() {
    this.store.dispatch({ type: AllianceActions.SEND_INVITE, payload: this.inviteTarget });
  }

  cancelInvite(playerId) {
    this.store.dispatch({ type: AllianceActions.CANCEL_INVITE, payload: playerId });
  }
}
