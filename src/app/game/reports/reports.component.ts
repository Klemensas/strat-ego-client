import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Report, CombatOutcome } from 'strat-ego-common';
// import { WorldData } from 'strat-ego-common';

export interface ReportMapped extends Report {
  type: CombatOutcome;
  result: string;
}

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})

export class ReportsComponent implements OnChanges, OnDestroy {
  @Input() public reports: {
    originReports: Report[],
    targetReports: Report[],
  };
  @Input() public worldData: any;
  public reportsMapped: ReportMapped[] = [];
  constructor() {}

  ngOnChanges() {
    this.reportsMapped = [
      ...this.mapReports(this.reports.originReports, CombatOutcome.attack),
      ...this.mapReports(this.reports.targetReports, CombatOutcome.defense),
    ]
      .sort((a, b) => +b.createdAt - +a.createdAt);
  }

  mapReports(reports: Report[], type: number): ReportMapped[] {
    return reports.map((report) => ({
      ...report,
      type,
      result: report.outcome === type ? 'win' : 'lose',
    }));
  }

  ngOnDestroy() {}
}
