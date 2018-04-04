import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ALLIANCE_PERMISSIONS, Alliance } from 'strat-ego-common';

import { PERMISSION_NAMES } from '../alliance.component';

@Component({
  selector: 'editable-roles',
  templateUrl: './editable-roles.component.html',
  styleUrls: ['./editable-roles.component.scss']
})
export class EditableRolesComponent implements OnChanges {
  @Input() alliance: Alliance;
  @Output() roleUpdate = new EventEmitter();
  @Output() roleRemove = new EventEmitter();

  public alliancePermissions = ALLIANCE_PERMISSIONS;
  public permissionNames = PERMISSION_NAMES;

  private rolePermissionForm: FormGroup = this.formBuilder.group({
    roles: this.formBuilder.array([]),
    newRoles: this.formBuilder.array([])
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {
    const alliance: Alliance = changes.alliance.currentValue;
    const roleGroups = alliance.roles.map((role) => this.formBuilder.group({
      id: role.id,
      name: [role.name, Validators.required],
      permissions: role.id === alliance.masterRoleId ?
        this.formBuilder.group(Object.entries(role.permissions).reduce((result, [name, value]) =>
          ({ ...result, [name]: this.formBuilder.control({ value, disabled: true }) }), {})) :
        this.formBuilder.group(role.permissions),
    }));
    this.rolePermissionForm.setControl('roles', this.formBuilder.array(roleGroups));
  }

  insertRole() {
    (this.rolePermissionForm.get('newRoles') as FormArray).push(this.formBuilder.group({
      name: ['', Validators.required],
      permissions: this.formBuilder.group(this.alliancePermissions.reduce((prev, current) => ({ ...prev, [current]: false }), {}))
    }));
  }

  removeRole(index) {
    (this.rolePermissionForm.controls.newRoles as FormArray).removeAt(index);
  }

  deleteRole(roleId) {
    this.roleRemove.emit(roleId);
  }

  saveChanges() {
    const roleArray = this.rolePermissionForm.controls.roles as FormArray;

    // Filter to only send actually changed roles
    const roleChanges = !roleArray.touched ? [] : roleArray.value.filter((role, i) => {
      const current = this.alliance.roles[i];
      return role.name.toLowerCase() !== current.name.toLowerCase() ||
        (role.id !== this.alliance.masterRoleId && this.alliancePermissions.some((perm) => role.permissions[perm] !== current.permissions[perm]));
    });
    this.roleUpdate.emit({ roles: roleChanges, newRoles: this.rolePermissionForm.controls.newRoles.value });
    (this.rolePermissionForm as FormGroup).setControl('newRoles', this.formBuilder.array([]));
  }
}
