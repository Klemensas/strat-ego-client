import { Component, Input, OnChanges, OnDestroy } from '@angular/core';

import { Town } from '../../store/town';
import { WorldData } from '../../store/world';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnChanges, OnDestroy {
  @Input() public town: Town;
  @Input() public worldData: WorldData;
  public reports = [];

  constructor() {}

  ngOnChanges() {
    this.reports = [...this.town.ReportOriginTown, ...this.town.ReportDestinationTown].map(report => {
      const type = report.ReportDestinationTownId === this.town._id ? 'defense' : 'attack';
      const result = report.outcome === 'attack' && type === 'attack' ? 'win' : 'lose';

      return {
        ...report,
        type,
        result,
      }
    }).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  }

  ngOnDestroy() {}
}
