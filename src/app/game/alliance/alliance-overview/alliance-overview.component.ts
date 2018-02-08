import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alliance, AllianceRole } from '../../../store/alliance/alliance.model';

@Component({
  selector: 'alliance-overview',
  templateUrl: './alliance-overview.component.html',
  styleUrls: ['./alliance-overview.component.scss']
})
export class AllianceOverviewComponent implements OnInit {
  @Input() alliance: Alliance;
  @Input() role: AllianceRole;
  @Output() leaveAlliance: EventEmitter<void> = new EventEmitter();
  @Output() destroyAlliance: EventEmitter<void> = new EventEmitter();

  private invitationStatus = {
    create: 'was invited by',
    cancel: 'invitation canceled by',
    reject: 'rejected invite'
  };
  private membershipStatus = {
    remove: 'was removed by',
    join: 'has joined',
    leave: 'has left'
  };

  constructor() { }

  ngOnInit() {
  }

}
