import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StoreState } from '../../store';
import { getPlayerInvitations, getPlayerAllianceData } from '../../store/alliance/alliance.selectors';
import { AllianceActions } from '../../store/alliance/alliance.actions';
import { ALLIANCE_PERMISSIONS, PERMISSION_NAMES } from '../../store/alliance/alliance.model';

@Component({
  selector: 'alliance',
  templateUrl: './alliance.component.html',
  styleUrls: ['./alliance.component.scss'],
})
export class AllianceComponent implements OnInit {
  public alliancePermissions = ALLIANCE_PERMISSIONS;
  public permissionNames = PERMISSION_NAMES;

  public allianceName = '';
  public inviteTarget = '';

  public invitations$ = this.store.select(getPlayerInvitations);
  public allianceData$ = this.store.select(getPlayerAllianceData);

  constructor(private store: Store<StoreState>, private formBuilder: FormBuilder) { }

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

  roleUpdate(payload) {
    this.store.dispatch({ type: AllianceActions.UPDATE_ROLE_PERMISSIONS, payload });
  }

  updatePlayerRole() {
    this.store.dispatch({ type: AllianceActions.UPDATE_PLAYER_ROLE })
  }

  roleRemove(payload) {
    this.store.dispatch({ type: AllianceActions.REMOVE_ROLE, payload });
  }

  destroyAlliance() {
    this.store.dispatch({ type: AllianceActions.DESTROY });
  }
}
