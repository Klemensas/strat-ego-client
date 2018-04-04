import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Alliance, ALLIANCE_PERMISSIONS, AlliancePermissions } from 'strat-ego-common';

import { PERMISSION_NAMES } from '../alliance.component';

@Component({
  selector: 'player-roles',
  templateUrl: './player-roles.component.html',
  styleUrls: ['./player-roles.component.scss']
})
export class PlayerRolesComponent {
  @Input() alliance: Alliance;
  @Output() playerRoleUpdate = new EventEmitter<{ playerId: number; roleId: number; }>();
  @Output() playerRemove = new EventEmitter<number>();

  public alliancePermissions = ALLIANCE_PERMISSIONS;
  public permissionNames = PERMISSION_NAMES;

  public allianceRolePermissions: { [role: string]: AlliancePermissions } = {};

  constructor() { }

  private compareRoles(r1, r2) {
    return r1 && r2 && r1.name === r2.name;
  }

  removePlayer(playerId: number) {
    this.playerRemove.emit(playerId);
  }

  updatePlayerRole(roleId: number, playerId: number) {
    this.playerRoleUpdate.emit({ roleId, playerId });
  }
}
