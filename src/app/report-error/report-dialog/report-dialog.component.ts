import { Component } from '@angular/core';
import { RollbarService } from '../../rollbar';
import { MatSnackBar, MatDialogRef } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent {
  public categories = [
    'bug',
    'feedback',
    'suggestion',
    'other',
  ];
  public category = '';
  public description = '';
  public canContact = true;

  constructor(private rollbarService: RollbarService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<ReportDialogComponent>) { }

  sendReport() {
    this.rollbarService.rollbar.info({
      category: this.category,
      description: this.description,
      canContact: this.canContact,
    }, () => this.reportSent());
  }

  reportSent() {
    this.dialogRef.close();
    this.snackBar.open('Report submitted successfully', null, { panelClass: ['snackbar-event', 'snackbar-success'], duration: 1800 });
  }

}
