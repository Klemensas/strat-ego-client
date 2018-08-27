import { Component, Input, OnChanges } from '@angular/core';
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

export class ReportComponent implements OnChanges {
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
      won: report.outcome === type,
    }));
  }

  trackById(index: number, report: Partial<Report>) {
    return report.id;
  }
}
