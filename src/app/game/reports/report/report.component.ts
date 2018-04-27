import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Report, CombatOutcome, Unit } from 'strat-ego-common';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  // styleUrls: ['./reports.component.scss'],
})
export class ReportComponent implements OnInit, OnDestroy {
  @Input() public report: Report;
  @Input() public unitList: Unit[] = [];
  public isCollapsed;
  public attackType = CombatOutcome.attack;

  constructor() {
    library.add(faChevronDown);
  }

  ngOnInit() {
  }

  ngOnDestroy() {}
}
