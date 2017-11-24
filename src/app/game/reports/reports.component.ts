import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Report } from 'app/store/report/report.model';
import { WorldData } from 'app/store/world/world.model';

export interface ReportMapped extends Report {
  type: string;
  result: string;
}

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})

export class ReportsComponent implements OnChanges, OnDestroy {
  @Input() public reports: {
    ReportOrigin: Report[],
    ReportDestination: Report[],
  };
  @Input() public worldData: WorldData;
  public reportsMapped: ReportMapped[] = [];

  constructor() {}

  ngOnChanges() {
    this.reportsMapped = [
      ...this.mapReports(this.reports.ReportOrigin, 'attack'),
      ...this.mapReports(this.reports.ReportDestination, 'defense'),
    ]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  mapReports(reports: Report[], type: string): ReportMapped[] {
    return reports.map((report) => ({
      ...report,
      type,
      result: report.outcome === type ? 'win' : 'lose',
    }))
  }

  ngOnDestroy() {}
}
