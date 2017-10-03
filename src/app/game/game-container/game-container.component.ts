import { Component, OnInit, OnDestroy, ViewChild, } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { MdSidenav, MdSnackBar } from '@angular/material';

import { getActiveWorld } from '../../store/world';
import { PlayerActions, getSidenavs } from '../../store/player';
import { getActiveTown, TownActions } from '../../store/town';
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
  public sidebars = {};
  public ts$ = this.store.select(getActiveTown).map((d) => { console.log('woop woop', d); return d; })
  public worldData$ = this.store.select(getActiveWorld);
  public canRecruit$ = this.store.select(getActiveTown)
    .map((town) => town && !!town.buildings.barracks.level);
  public isVisible;
  public sidenavSubscription$;

  constructor(
    private store: Store<StoreState>,
    private snackBar: MdSnackBar,
    private actions$: Actions,
  ) {}

  ngOnInit() {
    this.sidenavSubscription$ = this.store.select(getSidenavs)
      .subscribe(sidenavs => this.updateSidenavs(sidenavs));

    this.actions$.ofType(TownActions.UPDATE_EVENT)
      .map(toPayload)
      .map(({ town, event }) => event.type)
      .subscribe((event) => this.handleEvent(event))
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

  updateSidenavs(sidenavs) {
    // this.sidenavLeft
    this.sidenavLeft.comp = sidenavs.left;
    this.sidenavRight.comp = sidenavs.right;
    if (sidenavs.left) {
      this.sidenavLeft.open();
    } else {
      this.sidenavLeft.close();
    }

    if (sidenavs.right) {
      this.sidenavRight.open();
    } else {
      this.sidenavRight.close();
    }
  }

  sidenavToggle(side, name) {
    this.store.dispatch({ type: PlayerActions.SET_SIDENAV, payload: [{ side, name }]})
  }

  ngOnDestroy() {
    // this.socket.disconnect();
  }

  logout() {
    this.store.dispatch({ type: AuthActions.LOGOUT });
    // this.authService.logout();
  }

  private handleEvent(event) {
    this.snackBar.open(event)
  }
}
