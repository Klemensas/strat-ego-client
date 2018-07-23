import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Stage } from '../tutorial.component';

@Component({
  selector: 'tutorial-dialog',
  templateUrl: './tutorial-dialog.component.html',
  styleUrls: ['./tutorial-dialog.component.scss']
})
export class TutorialDialogComponent {
  constructor(public dialogRef: MatDialogRef<TutorialDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Stage) { }
}
