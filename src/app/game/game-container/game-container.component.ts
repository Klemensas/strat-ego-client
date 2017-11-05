import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { MatSidenav, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { getActiveWorld } from '../../store/world';
import { PlayerActions, getSidenavs, getPlayerReports } from '../../store/player';
import { getTownState, getActiveTown, TownActions, TownState, Town } from '../../store/town';
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

  public townList: Town[];
  public activeTown: Town;
  public canRecruit: boolean;

  public townState$ = this.store.select(getTownState);
  public reports$ = this.store.select(getPlayerReports);
  public worldData$ = this.store.select(getActiveWorld);
  public isVisible;
  public sidenavSubscription: Subscription;
  public townStateSubscription: Subscription;

  constructor(
    private store: Store<StoreState>,
    private snackBar: MatSnackBar,
    private actions$: Actions,
  ) {}

  ngOnInit() {
    this.townStateSubscription = this.townState$.subscribe((townState: TownState) => {
      this.townList = townState.playerTowns;
      this.activeTown = townState.playerTowns.find((town) => town._id === townState.activeTown);
      this.canRecruit = this.activeTown && !!this.activeTown.buildings.barracks.level;
    });
    this.sidenavSubscription = this.store.select(getSidenavs)
      .subscribe(sidenavs => this.updateSidenavs(sidenavs));

    this.actions$.ofType(TownActions.UPDATE_EVENT)
      .map(toPayload)
      .map(({ town, event }) => event.type)
      .subscribe((event) => this.handleEvent(event))
  }

  updateSidenavs(sidenavs) {
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
    this.sidenavSubscription.unsubscribe();
    this.townStateSubscription.unsubscribe();
  }

  logout() {
    this.store.dispatch({ type: AuthActions.LOGOUT });
  }

  selectTown(townId: number) {
    this.store.dispatch({ type: TownActions.SET_ACTIVE_TOWN, payload: townId });
  }

  private handleEvent(event) {
    let message;
    switch (event) {
      case 'name':
        message = 'Town name changed';
        break;
      case 'movement':
        message = 'Movement started';
        break;
      case 'recruit':
        message = 'Recruitment queued';
        break;
      case 'build':
        message = 'Building queued';
        break;
      default:
        return;
    }
    this.snackBar.open(message, null, { duration: 3000 })
  }
}
