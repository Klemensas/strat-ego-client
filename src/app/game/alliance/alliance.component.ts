import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { getPlayerInvitations, getPlayerAllianceData } from '../../store/alliance/alliance.selectors';
import { AllianceActions } from '../../store/alliance/alliance.actions';
import { ALLIANCE_PERMISSIONS, PERMISSION_NAMES } from '../../store/alliance/alliance.model';
import { GameModuleState } from '../../store';

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

  constructor(private store: Store<GameModuleState>, private formBuilder: FormBuilder) { }

  ngOnInit() {}

  createAlliance() {
    if (this.allianceName.length > 3) {
      this.store.dispatch({ type: AllianceActions.CREATE, payload: this.allianceName });
    }
  }

  acceptInvite(payload: number) {
    this.store.dispatch({ type: AllianceActions.ACCEPT_INVITE, payload });
  }

  rejectInvite(payload: number) {
    this.store.dispatch({ type: AllianceActions.REJECT_INVITE, payload });
  }

  createInvite() {
    this.store.dispatch({ type: AllianceActions.CREATE_INVITE, payload: this.inviteTarget });
  }

  cancelInvite(playerId) {
    this.store.dispatch({ type: AllianceActions.CANCEL_INVITE, payload: playerId });
  }

  updatePlayerRole(payload) {
    this.store.dispatch({ type: AllianceActions.UPDATE_MEMBER_ROLE, payload });
  }

  roleUpdate(payload) {
    this.store.dispatch({ type: AllianceActions.UPDATE_ROLE_PERMISSIONS, payload });
  }

  roleRemove(payload) {
    this.store.dispatch({ type: AllianceActions.REMOVE_ROLE, payload });
  }

  removeMember(payload) {
    this.store.dispatch({ type: AllianceActions.REMOVE_MEMBER, payload });
  }

  destroyAlliance() {
    this.store.dispatch({ type: AllianceActions.DESTROY });
  }

  leaveAlliance() {
    this.store.dispatch({ type: AllianceActions.LEAVE_ALLIANCE });
  }
}
