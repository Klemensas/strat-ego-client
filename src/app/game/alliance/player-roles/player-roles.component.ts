import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Alliance } from '../../../store/alliance/alliance.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';

@Component({
  selector: 'player-roles',
  templateUrl: './player-roles.component.html',
  styleUrls: ['./player-roles.component.scss']
})
export class PlayerRolesComponent implements OnChanges {
  @Input() alliance: Alliance;

  private memberRoleForm: FormGroup = this.formBuilder.group({
    members: this.formBuilder.array([]),
  });


  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {
    const alliance = changes.alliance.currentValue;
    console.log('hmm', alliance)
    const memberRoles = alliance.Members.map((member) => this.formBuilder.group({
      id: member.id,
      role: member.AllianceRole.name,
    }));
    this.memberRoleForm.setControl('members', this.formBuilder.array(memberRoles));

  }

}
