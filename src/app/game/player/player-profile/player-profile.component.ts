import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatTableDataSource, MatDialogRef } from '@angular/material';
import { Player } from 'strat-ego-common';
import { EditProfileComponent } from '../../alliance/alliance-profile/edit-profile/edit-profile.component';

@Component({
  selector: 'player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnChanges {
  @Input() player: Player = null;
  @Input() currentPlayer: Player = null;
  @Output() openAllianceProfile = new EventEmitter();

  displayedColumns = ['location', 'name', 'score'];
  dataSource = new MatTableDataSource<Partial<Player>>([]);
  editDialog: MatDialogRef<EditProfileComponent>;

  constructor(public dialog: MatDialog) {}

  ngOnChanges() {
    this.dataSource.data = this.player ? this.player.towns : [];
    this.dataSource.data.sort((a, b) => b.score - a.score || a.id - b.id);
    if (this.editDialog) {
      this.editDialog.componentInstance.data = {
        avatarUrl: this.player.avatarUrl,
        description: this.player.description,
        type: 'player',
      };
    }
  }

  editProfile(): void {
    this.editDialog = this.dialog.open(EditProfileComponent, {
      width: '80vw',
      data: {
        description: this.player.description,
        avatarUrl: this.player.avatarUrl,
        type: 'player',
      }
    });

    this.editDialog.afterClosed().subscribe(result => {
      this.editDialog = null;
    });
  }

}
