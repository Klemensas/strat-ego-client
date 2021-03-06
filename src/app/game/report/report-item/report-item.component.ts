import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CombatOutcome, Unit } from 'strat-ego-common';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ReportMapped } from '../report.component';

@Component({
  selector: 'report-item',
  templateUrl: './report-item.component.html',
})
export class ReportItemComponent implements OnInit, OnDestroy {
  @Input() public report: ReportMapped;
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
