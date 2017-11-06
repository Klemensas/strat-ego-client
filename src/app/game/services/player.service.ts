import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { SocketService } from './socket.service';
import { ReportService } from './report.service';

import { Player } from '../models/Player';

@Injectable()
export class PlayerService {
  public data: Player;
  public activeTown = new BehaviorSubject(null);
  public playerData = new BehaviorSubject(null);
  public sidenavEvents: Subject<string> = new Subject();

  private hasActiveTown = false;

  constructor(private socket: SocketService, private reportService: ReportService) {
  }

  observePlayer() {
    this.hasActiveTown = false;
    const playerEvents = this.socket.events.get('player').subscribe(event => {
      this.data = event;
      this.reportService.setPlayer(event._id);

      if (!this.hasActiveTown) {
        this.setActiveTown(0);
      }
      this.playerData.next(event);

      event.ReportDestinationPlayer = event.ReportDestinationPlayer || [];
      event.ReportOriginPlayer = event.ReportOriginPlayer || [];
      this.reportService.updateReports(...event.ReportDestinationPlayer, ...event.ReportOriginPlayer);
    });

  return this.playerData;
  }

  setActiveTown(id) {
    this.activeTown.next(this.data.Towns[id]);
    this.hasActiveTown = true;
  }

  toggleSidenav(target) {
    this.sidenavEvents.next(target);
  }
}
