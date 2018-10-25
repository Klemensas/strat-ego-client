import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ALLIANCE_PERMISSIONS, PermissionNames, AllianceEvent } from 'strat-ego-common';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faEye, faEdit, faComments, faTasks } from '@fortawesome/free-solid-svg-icons';
import { faEnvelopeOpen, faIdCard, faIdBadge } from '@fortawesome/free-regular-svg-icons';

import { GameModuleState, getPlayerInvitations, getPlayerAllianceData, getPlayerEntities, getAllianceEntities } from '../reducers';
import {
  Create,
  AcceptInvite,
  Destroy,
  LeaveAlliance,
  RejectInvite,
  CreateInvite,
  CancelInvite,
  UpdateMemberRole,
  UpdateRolePermissions,
  RemoveRole,
  RemoveMember,
  ViewProfile
} from './alliance.actions';
import { combineLatest, map } from 'rxjs/operators';


export const PERMISSION_NAMES: { [name in PermissionNames] } = {
  viewInvites: [['fas', 'eye'], ['far', 'envelope-open']],
  editInvites: [['fas', 'edit'], ['far', 'envelope-open']],
  manageForum: [['fas', 'edit'], ['fas', 'comments']],
  viewManagement: [['fas', 'eye'], ['far', 'id-card']],
  manageRoles: [['fas', 'edit'], ['far', 'id-badge']],
  editProfile: [['fas', 'edit'], ['far', 'id-card']],
  manageAlliance: [['fas', 'edit'], ['fas', 'tasks']],
};

// TODO: add in progress display for wherever needed (especially role updates)

@Component({
  selector: 'alliance',
  templateUrl: './alliance.component.html',
  styleUrls: ['./alliance.component.scss'],
})
export class AllianceComponent implements OnInit {
  @Output() openAllianceProfile = new EventEmitter();
  @Output() openPlayerProfile = new EventEmitter();

  public alliancePermissions = ALLIANCE_PERMISSIONS;

  public allianceName = '';
  public inviteTarget = '';

  public playerProfiles$ = this.store.select(getPlayerEntities);
  public allianceProfiles$ = this.store.select(getAllianceEntities);
  public invitations$ = this.store.select(getPlayerInvitations);
  public allianceData$ = this.store.select(getPlayerAllianceData)
    .pipe(
      combineLatest(this.playerProfiles$, this.allianceProfiles$),
      map(([{ alliance, role }, playerProfiles, allianceProfiles]) => {
        return {
          role,
          alliance: !alliance ? null : {
            ...alliance,
            events: alliance.events.map((event) => {
              const fullEvent: Partial<AllianceEvent> = { ...event };
              if (event.originAllianceId) { fullEvent.originAlliance = allianceProfiles[event.originAllianceId]; }
              if (event.targetAllianceId) { fullEvent.targetAlliance = allianceProfiles[event.targetAllianceId]; }
              if (event.originPlayerId) { fullEvent.originPlayer = playerProfiles[event.originPlayerId]; }
              if (event.targetPlayerId) { fullEvent.targetPlayer = playerProfiles[event.targetPlayerId]; }
              return fullEvent;
            }),
            invitations: alliance.invitations.map(({ id }) => ({
              id,
              ...playerProfiles[id]
            })),
            diplomacyOrigin: alliance.diplomacyOrigin.map((diplomacy) => ({
              ...diplomacy,
              targetAlliance: allianceProfiles[diplomacy.targetAllianceId]
            })),
            members: alliance.members.map((member) => {
              const profile = playerProfiles[member.id];
              return {
                allianceRole: alliance.roles.find(({ id }) => id === member.allianceRoleId),
                ...member,
                ...profile,
              };
            })
            .sort((a, b) => b.score - a.score || a.id - b.id)
          }
        };
      })
    );

  constructor(private store: Store<GameModuleState>, private formBuilder: FormBuilder) {
    library.add(faTimes, faEye, faEdit, faEnvelopeOpen, faComments, faIdCard, faIdBadge, faTasks);
  }

  ngOnInit() {}

  onOpenAllianceProfile(id: number) {
    this.store.dispatch(new ViewProfile(id));
  }

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
