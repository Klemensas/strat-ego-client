import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alliance, AlliancePermissions, ALLIANCE_PERMISSIONS, PERMISSION_NAMES } from '../../../store/alliance/alliance.model';

@Component({
  selector: 'player-roles',
  templateUrl: './player-roles.component.html',
  styleUrls: ['./player-roles.component.scss']
})
export class PlayerRolesComponent implements OnChanges {
  @Input() alliance: Alliance;

  public alliancePermissions = ALLIANCE_PERMISSIONS;
  public permissionNames = PERMISSION_NAMES;

  public allianceRolePermissions: { [role: string]: AlliancePermissions } = {};

  private memberRoleForm: FormGroup = this.formBuilder.group({
    members: this.formBuilder.array([]),
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {
    const alliance = changes.alliance.currentValue;
    this.allianceRolePermissions = changes.alliance.currentValue.Roles.reduce((p, c) => ({ ...p, [c.name]: c.permissions }), {});
    const memberRoles = alliance.Members.map((member) => this.formBuilder.group({
      id: member.id,
      role: [member.AllianceRole.name, Validators.required],
    }));
    this.memberRoleForm.setControl('members', this.formBuilder.array(memberRoles));
  }

  test(d) { console.log('hu', d)}
}
