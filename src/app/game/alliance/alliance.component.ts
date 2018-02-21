import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ALLIANCE_PERMISSIONS, PERMISSION_NAMES } from '../../store/alliance/alliance.model';
import { GameModuleState, getPlayerInvitations, getPlayerAllianceData } from '../../store';
import { Create, AcceptInvite, Destroy, LeaveAlliance, RejectInvite, CreateInvite, CancelInvite, UpdateMemberRole, UpdateRolePermissions, RemoveRole, RemoveMember } from '../../store/alliance/alliance.actions';

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
      this.store.dispatch(new Create(this.allianceName));
    }
  }

  acceptInvite(payload: number) {
    this.store.dispatch(new AcceptInvite(payload));
  }

  rejectInvite(payload: number) {
    this.store.dispatch(new RejectInvite(payload));
  }

  createInvite() {
    this.store.dispatch(new CreateInvite(this.inviteTarget));
  }

  cancelInvite(playerId) {
    this.store.dispatch(new CancelInvite(playerId));
  }

  updatePlayerRole(payload) {
    this.store.dispatch(new UpdateMemberRole(payload));
  }

  roleUpdate(payload) {
    this.store.dispatch(new UpdateRolePermissions(payload));
  }

  roleRemove(payload) {
    this.store.dispatch(new RemoveRole(payload));
  }

  removeMember(payload) {
    this.store.dispatch(new RemoveMember(payload));
  }

  destroyAlliance() {
    this.store.dispatch(new Destroy());
  }

  leaveAlliance() {
    this.store.dispatch(new LeaveAlliance());
  }
}
