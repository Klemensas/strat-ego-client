import { Component, OnInit } from '@angular/core';

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
  private nameChange = '';
  public town: Town;

  constructor(private socket: SocketService, private playerService: PlayerService, private townService: TownService) {
  }

  ngOnInit() {
    // Subscribe to town data updates
    this.townObserver = this.townService.currentTown.subscribe(update => {
      this.town = update;
      // console.log('Town component: town updated', this.townService)
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
