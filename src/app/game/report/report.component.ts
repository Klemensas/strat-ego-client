import { Component, Input } from '@angular/core';
import { Report, CombatOutcome } from 'strat-ego-common';

export interface ReportMapped extends Report {
  type: CombatOutcome;
  won: boolean;
}

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})

export class ReportComponent {
  @Input() public reports: ReportMapped;
  @Input() public worldData: any;

  constructor() {}

  trackById(index: number, report: Partial<Report>) {
    return report.id;
  }
}
