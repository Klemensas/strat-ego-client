import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Profile } from 'strat-ego-common';

@Component({
  selector: 'alliance-invitations',
  templateUrl: './alliance-invitations.component.html',
  styleUrls: ['./alliance-invitations.component.scss']
})
export class AllianceInvitationsComponent implements OnInit {
  @Input() isAlliance = false;
  @Input() invitations: Profile[];

  @Output() acceptInvite: EventEmitter<number> = new EventEmitter();
  @Output() rejectInvite: EventEmitter<number> = new EventEmitter();
  @Output() cancelInvite: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
