import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Report } from '../../models';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  // styleUrls: ['./reports.component.scss'],
})
export class ReportComponent implements OnInit, OnDestroy {
  @Input() public report: Report;
  @Input() public unitList = [];
  public isCollapsed;

  ngOnInit() {
  }

  ngOnDestroy() {}
}
