import { Component, OnInit, OnDestroy, ViewChild, } from '@angular/core';

import { PlayerService, TownService, SocketService, ReportService } from '../services';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss']
})
export class GameContainerComponent implements OnInit, OnDestroy {
  @ViewChild('sidenavLeft') sidenavLeft;
  @ViewChild('sidenavRight') sidenavRight;

  public reports = [];
  public canRecruit = false;
  public isVisible;

  constructor(private socket: SocketService, private playerService: PlayerService, private townService: TownService, private authService: AuthService, private reportService: ReportService) {
  }

  ngOnInit() {
    // Initialize sockets
    this.playerService.observePlayer();
    this.townService.observeTown().subscribe(town => {
      if (town) {
        this.canRecruit = !!town.buildings['barracks'].level;
      }
    });
    this.playerService.sidenavEvents.subscribe(target => this.sidenavToggle(this.sidenavLeft, target));
    this.reportService.observeReports().subscribe(reports => {
      this.reports = reports;
      console.log('report?', reports)
    })
  }

  sidenavToggle(nav, component) {
    // console.log('got da event', target, state)
    nav.comp = component;
    nav.open();
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  logout() {
    this.authService.logout();
  }
}
