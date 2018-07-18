import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';

@Component({
  selector: 'report-error',
  templateUrl: './report-error.component.html',
  styleUrls: ['./report-error.component.scss']
})
export class ReportErrorComponent implements OnInit {
  reportDialog: MatDialogRef<ReportDialogComponent>;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    library.add(faBug);
  }

  openDialog() {
    this.reportDialog = this.dialog.open(ReportDialogComponent, { maxWidth: 500 });

    this.reportDialog.afterClosed().subscribe(result => {
      this.reportDialog = null;
    });
  }
}
