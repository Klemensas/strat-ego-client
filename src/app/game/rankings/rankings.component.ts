import { Component, Input, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { PlayerProfile } from 'strat-ego-common';

// TODO: abstract rank table into a component and reuse between rankings and alliance profile
@Component({
  selector: 'rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnChanges, AfterViewInit {
  @Input() public positionRankings: { rankings: PlayerProfile[], playerPosition: number };

  displayedColumns = ['rank', 'name', 'score'];
  dataSource = new MatTableDataSource<PlayerProfile>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.initializePaginator();
  }


  ngOnChanges() {
    this.dataSource.data = this.positionRankings.rankings;
    this.initializePaginator();
  }

  initializePaginator() {
    // Hack for correct paginator refresh
    // TODO: factor out the hack, it should be possible either through a custom datasource or changing pagination interactivity
    if (this.positionRankings && !this.dataSource.paginator && this.paginator) {
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        // setTimeout(() => {
          const playerPage = Math.floor(this.positionRankings.playerPosition / this.paginator.pageSize);
          this.dataSource.paginator.pageIndex = playerPage;
        // });
      });
    }
  }

}
