import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreState } from '../../store';
import { getPlayerAlliance, getPlayerInvitations } from '../../store/alliance/alliance.selectors';
import { AllianceActions } from '../../store/alliance/alliance.actions';
import { getPlayerAllianceRoleName } from '../../store/player/player.selectors';
import { ALLIANCE_PERMISSIONS, PERMISSION_NAMES } from '../../store/alliance/alliance.model';


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
    .map(([{ role, name }, alliance]) => {
      if (alliance) {
        alliance.roleArray = Object.keys(alliance.roles);
        console.log('hmm', alliance);
      }
      return ({ role, name, alliance });
    });
  public allianceName = '';
  public inviteTarget = '';
  public alliancePermissions = ALLIANCE_PERMISSIONS;
  public permissionNames = PERMISSION_NAMES;

  constructor(private store: Store<StoreState>) { }

  ngOnInit() {}

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
