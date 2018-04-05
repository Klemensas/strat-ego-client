import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alliance, AllianceRole, EventStatus, EventType } from 'strat-ego-common';

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

  public eventStatuses = EventStatus;
  public eventTypes = EventType;

  public invitationStatus = {
    [this.eventStatuses.create]: 'was invited by',
    [this.eventStatuses.cancel]: 'invitation canceled by',
    [this.eventStatuses.reject]: 'rejected invite'
  };
  public membershipStatus = {
    [this.eventStatuses.remove]: 'was removed by',
    [this.eventStatuses.join]: 'has joined',
    [this.eventStatuses.leave]: 'has left'
  };
  public diplomacySubjectStatus = [
    'proposed alliance',
    'canceled their alliance proposal',
    'rejected our alliance proposal',
    'aggreed to enter into alliance',
    'ended our alliance',
    'proposed NAP',
    'canceled their NAP proposal',
    'rejected our NAP proposal',
    'aggreed to enter into NAP',
    'ended our NAP',
    'declared war',
    'aggreed to end war',
  ];
  public diplomacyOriginStatus = [
    'proposed alliance to',
    'canceled alliance proposal of',
    'rejected alliance proposal of',
    'aggreed to enter into alliance with',
    'ended our alliance with',
    'proposed NAP to',
    'canceled NAP proposal of',
    'rejected NAP proposal of',
    'aggreed to enter into NAP with',
    'ended our NAP with',
    'declared war on',
    'aggreed to end war with',
  ];

  constructor() { }

  ngOnInit() {
  }

}
