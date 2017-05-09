import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { GameDataService } from '../../services/game-data.service';
// import { TownService } from '../services/town.service';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit, OnDestroy {
  @Input() public reports;
  public unitArray;

  constructor(private gameDataService: GameDataService) {}

  ngOnInit() {
    this.gameDataService.data.activeWorld.subscribe(data => {
      console.log('game data?');
      this.unitArray = data.units;
    });
  }

  ngOnDestroy() {}
}
