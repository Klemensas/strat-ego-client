import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Alliance, AlliancePermissions, ALLIANCE_PERMISSIONS, PERMISSION_NAMES } from '../../../store/alliance/alliance.model';

@Component({
  selector: 'player-roles',
  templateUrl: './player-roles.component.html',
  styleUrls: ['./player-roles.component.scss']
})
export class PlayerRolesComponent {
  @Input() alliance: Alliance;
  @Output() playerRoleUpdate = new EventEmitter<{ playerId: number; roleId: number; }>();

  public alliancePermissions = ALLIANCE_PERMISSIONS;
  public permissionNames = PERMISSION_NAMES;

  public allianceRolePermissions: { [role: string]: AlliancePermissions } = {};

  constructor() { }

  compareRoles(r1, r2) {
    return r1 && r2 && r1.name === r2.name;
  }

  updatePlayerRole(roleId: number, playerId: number) {
    this.playerRoleUpdate.emit({ roleId, playerId });
  }
}
