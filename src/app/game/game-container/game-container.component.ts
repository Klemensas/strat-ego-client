import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { filter, map, combineLatest } from 'rxjs/operators';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faUsers, faGlobe, faArrowsAlt, faHandsHelping, faSortAmountUp, faFlag, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

import {
  GameModuleState,
  getTownState,
  getCurrentPlayer,
  getPlayerReports,
  getSidenavs,
  getPlayerAlliance,
  getAllRankings,
  getPlayerPosition,
  getRankingsProgress,
  getViewedAlliance,
  getRankingEntities,
  getViewedPlayer
} from '../reducers';
import { ViewProfile as viewAllianceProfile } from '../alliance/alliance.actions';
import { ViewProfile as viewPlayerProfile } from '../player/player.actions';
import { Town } from '../town/town.model';
import { SetActiveTown } from '../town/town.actions';
import { SetSidenav, Restart } from '../player/player.actions';
import { Logout } from '../../auth/auth.actions';
import { getActiveWorld } from '../../reducers';

// TODO: consider using routes for sidenavs, should result in cleaner implementations and also easier linking

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

  public player$ = this.store.select(getCurrentPlayer);
  public alliance$ = this.store.select(getPlayerAlliance);
  public townState$ = this.store.select(getTownState);
  public reports$ = this.store.select(getPlayerReports);
  public worldData$ = this.store.select(getActiveWorld);
  public positionRankings$ = this.store.select(getAllRankings)
    .pipe(
      combineLatest(this.store.select(getPlayerPosition)),
      map(([rankings, playerPosition]) => ({ rankings, playerPosition })),
    );
  public noTowns$ = this.townState$
    .pipe(
      map((state) => !state.inProgress && !state.ids.length)
    );
  public viewedAlliance$ = this.store.select(getViewedAlliance)
    .pipe(
      combineLatest(this.store.select(getRankingEntities)),
      filter(([alliance, rankings]) => !!alliance && !!Object.keys(rankings).length),
      map(([alliance, rankings]) => ({
        ...alliance,
        members: alliance.members.map(({ id }) => {
          const { name, score } = rankings[id];
          return {
            id,
            name,
            score,
          };
        })
      }))
    );
  public viewedPlayer$ = this.store.select(getViewedPlayer);

  public isVisible;
  public sidenavSubscription: Subscription;
  public townStateSubscription: Subscription;

  constructor(
    private store: Store<GameModuleState>,
    private snackBar: MatSnackBar,
    private actions$: Actions,
  ) {
    library.add(faHome, faUsers, faGlobe, faArrowsAlt, faHandsHelping, faFlag, faSortAmountUp, faShieldAlt, faUserCircle);
  }

  ngOnInit() {
    this.townStateSubscription = this.townState$.subscribe((townState) => {
      this.townList = townState.ids.map((id) => townState.playerTowns[id]);
      this.activeTown = townState.playerTowns[townState.activeTown];
      this.canRecruit = this.activeTown && !!this.activeTown.buildings.barracks.level;
    });
    this.sidenavSubscription = this.store.select(getSidenavs).pipe(
      filter(() => this.sidenavLeft && this.sidenavRight)
    )
      .subscribe(sidenavs => this.updateSidenavs(sidenavs));

    // this.actions$.pipe(
    //   ofType(TownActionTypes.UpdateEvent),
    //   map((action: ActionWithPayload) => action.payload),
    //   map(({ town, event }) => event.type)
    // ).subscribe((event) => this.handleEvent(event));
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

  onOpenProfile(id: number, type: string) {
    const action = type === 'alliance' ? viewAllianceProfile : viewPlayerProfile;
    this.store.dispatch(new action(id));
  }

  sidenavToggle(side, name) {
    this.store.dispatch(new SetSidenav([{ side, name }]));
  }

  ngOnDestroy() {
    this.sidenavSubscription.unsubscribe();
    this.townStateSubscription.unsubscribe();
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  selectTown(townId: number) {
    this.store.dispatch(new SetActiveTown(townId));
  }

  restart() {
    this.store.dispatch(new Restart());
  }

  // private handleEvent(event) {
  //   let message;
  //   switch (event) {
  //     case 'name':
  //       message = 'Town name changed';
  //       break;
  //     case 'movement':
  //       message = 'Movement started';
  //       break;
  //     case 'recruit':
  //       message = 'Recruitment queued';
  //       break;
  //     case 'build':
  //       message = 'Building queued';
  //       break;
  //     default:
  //       return;
  //   }
  //   this.snackBar.open(message, null, { duration: 3000 });
  // }
}
