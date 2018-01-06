import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ALLIANCE_PERMISSIONS, PERMISSION_NAMES, Alliance } from '../../../store/alliance/alliance.model';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'editable-roles',
  templateUrl: './editable-roles.component.html',
  styleUrls: ['./editable-roles.component.scss']
})
export class EditableRolesComponent implements OnChanges {
  @Input() alliance: Alliance;
  @Output() roleUpdate = new EventEmitter();

  public alliancePermissions = ALLIANCE_PERMISSIONS;
  public permissionNames = PERMISSION_NAMES;

  private rolePermissionForm: FormGroup = this.formBuilder.group({
    roles: this.formBuilder.array([]),
    newRoles: this.formBuilder.array([])
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {
    const alliance = changes.alliance.currentValue;
    const roleGroups = alliance.Roles.map((role) => this.formBuilder.group({
      id: role.id,
      name: [role.name, Validators.required],
      permissions: this.formBuilder.group(role.permissions)
    }));
    this.rolePermissionForm.setControl('roles', this.formBuilder.array(roleGroups));
  }

  insertRole() {
    (this.rolePermissionForm.get('newRoles') as FormArray).push(this.formBuilder.group({
      name: ['', Validators.required],
      permissions: this.formBuilder.group(this.alliancePermissions.reduce((prev, current) => ({ ...prev, [current]: false }), {}))
    }));
  }

  saveChanges() {
    const roleArray = this.rolePermissionForm.controls.roles as FormArray;

    // Filter to only send actually changed roles
    const roleChanges = !roleArray.touched ? [] : roleArray.value.filter((role, i) => {
      const current = this.alliance.Roles[i];
      return role.name.toLowerCase() !== current.name.toLowerCase() ||
        this.alliancePermissions.some((perm) => role.permissions[perm] !== current.permissions[perm]);
    });
    this.roleUpdate.emit({ roles: roleChanges, newRoles: this.rolePermissionForm.controls.newRoles.value });
  }
}
