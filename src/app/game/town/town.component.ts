// TODO: refactor some town elements in to simple presentation components

import { Component, OnInit } from '@angular/core';

import { GameDataService } from '../../services/game-data.service';
import { SocketService, PlayerService, TownService } from '../services';

import { Subscription } from 'rxjs/Subscription';

import { Town } from '../models/Town';

@Component({
  selector: 'town',
  templateUrl: './town.component.html',
  styleUrls: ['./town.component.scss'],
})

export class TownComponent implements OnInit {
  private townObserver: Subscription;
  private gameObserver: Subscription;
  private nameChange = '';
  public town: Town;
  public worldData;

  constructor(private socket: SocketService, private playerService: PlayerService, private townService: TownService, private gameDataService: GameDataService) {
  }

  ngOnInit() {
    // Subscribe to town data updates
    this.townObserver = this.townService.currentTown.subscribe(update => {
      this.town = update;
    });
  }

  changeName() {
    if (this.nameChange.length > 3 && this.nameChange !== this.town.name) {
      this.townService.changeName(this.nameChange);
    }
  }

  ngOnDestroy() {
    this.townObserver.unsubscribe();
  }
}
