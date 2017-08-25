import { Component, OnInit, OnDestroy, ViewChild, } from '@angular/core';
import { Store } from '@ngrx/store';
import { MdSidenav } from '@angular/material';

import { getActiveTown } from '../../store/town';
import { getActiveWorld } from '../../store/world';
import { AuthActions } from '../../store/auth';
import { StoreState } from '../../store';

@Component({
  selector: 'game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss']
})
export class GameContainerComponent implements OnInit, OnDestroy {
  @ViewChild('sidenavLeft') sidenavLeft;
  @ViewChild('sidenavRight') sidenavRight;

  public reports = [];
  public ts$ = this.store.select(getActiveTown).map((d) => { console.log('woop woop', d); return d; })
  public worldData$ = this.store.select(getActiveWorld);
  public canRecruit$ = this.store.select(getActiveTown)
    .map((town) => town && !!town.buildings.barracks.level);
  public isVisible;

  constructor(
    private store: Store<StoreState>
  ) {}

  ngOnInit() {
    // this.store.select()
    console.log('wat');
    // Initialize sockets
    // this.playerService.observePlayer();
    // this.townService.observeTown().subscribe(town => {
    //   if (town) {
    //     this.canRecruit = !!town.buildings['barracks'].level;
    //   }
    // });
    // this.playerService.sidenavEvents.subscribe(target => this.sidenavToggle(this.sidenavLeft, target));
    // this.reportService.observeReports().subscribe(reports => {
    //   this.reports = reports;
    //   console.log('report?', reports)
    // })
  }

  sidenavToggle(nav, component) {
    // console.log('got da event', target, state)
    nav.comp = component;
    nav.open();
  }

  ngOnDestroy() {
    // this.socket.disconnect();
  }

  logout() {
    this.store.dispatch({ type: AuthActions.LOGOUT });
    // this.authService.logout();
  }
}
