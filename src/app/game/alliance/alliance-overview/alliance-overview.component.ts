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
  private diplomacySubjectStatus = {
    proposeAlliance: 'proposed alliance',
    cancelAlliance: 'canceled their alliance proposal',
    rejectAlliance: 'rejected our alliance proposal',
    startAlliance: 'aggreed to enter into alliance',
    endAlliance: 'ended our alliance',
    proposeNap: 'proposed NAP',
    cancelNap: 'canceled their NAP proposal',
    rejectNap: 'rejected our NAP proposal',
    startNap: 'aggreed to enter into NAP',
    endNap: 'ended our NAP',
    startWar: 'declared war',
    endWar: 'aggreed to end war',
  }
  private diplomacyOriginStatus = {
    proposeAlliance: 'proposed alliance to',
    cancelAlliance: 'canceled alliance proposal of',
    rejectAlliance: 'rejected alliance proposal of',
    startAlliance: 'aggreed to enter into alliance with',
    endAlliance: 'ended our alliance with',
    proposeNap: 'proposed NAP to',
    cancelNap: 'canceled NAP proposal of',
    rejectNap: 'rejected NAP proposal of',
    startNap: 'aggreed to enter into NAP with',
    endNap: 'ended our NAP with',
    startWar: 'declared war on',
    endWar: 'aggreed to end war with',
  }

  constructor() { }

  ngOnInit() {
  }

}
