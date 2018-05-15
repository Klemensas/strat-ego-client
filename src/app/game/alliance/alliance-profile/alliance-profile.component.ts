import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { Alliance, AllianceRole, Player } from 'strat-ego-common';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'alliance-profile',
  templateUrl: './alliance-profile.component.html',
  styleUrls: ['./alliance-profile.component.scss']
})
export class AllianceProfileComponent implements OnChanges {
  @Input() alliance: Alliance = null;
  @Input() role: AllianceRole;
  @Output() openPlayerProfile = new EventEmitter();

  displayedColumns = ['rank', 'name', 'score'];
  dataSource = new MatTableDataSource<Partial<Player>>([]);
  editDialog: MatDialogRef<EditProfileComponent>;

  get allianceScore() {
    return this.alliance.members.reduce((result, { score }) => result + score, 0);
  }

  constructor(public dialog: MatDialog) {}

  ngOnChanges() {
    this.dataSource.data = this.alliance.members;
    if (this.editDialog) {
      this.editDialog.componentInstance.data = {
        avatarUrl: this.alliance.avatarUrl,
        description: this.alliance.description,
      };
    }
  }

  editProfile(): void {
    this.editDialog = this.dialog.open(EditProfileComponent, {
      width: '80vw',
      data: this.alliance
    });

    this.editDialog.afterClosed().subscribe(result => {
      this.editDialog = null;
    });
  }


}
