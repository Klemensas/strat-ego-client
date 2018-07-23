import { Component, OnInit, OnDestroy, ViewChild, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { filter, map, combineLatest, tap } from 'rxjs/operators';
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
  getViewedAlliance,
  getRankingEntities,
  getViewedPlayer,
} from '../reducers';
import {
  ViewProfile as viewAllianceProfile,
  AllianceActionTypes,
  AllianceSuccessActions,
  AllianceFailActions } from '../alliance/alliance.actions';
import { ViewProfile as viewPlayerProfile, PlayerActionTypes, PlayerSuccessActions, PlayerFailActions, ProgressTutorial } from '../player/player.actions';
import { Town } from '../town/town.model';
import { SetActiveTown, TownActionTypes, TownSuccessActions, TownFailActions } from '../town/town.actions';
import { SetSidenav, Restart } from '../player/player.actions';
import { Logout } from '../../auth/auth.actions';
import { getActiveWorld } from '../../reducers';

export const actionMessages = {
  [PlayerActionTypes.LoadProfileSuccess]: 'Player profile loaded successfully',
  [PlayerActionTypes.UpdateProfileSuccess]: 'Profile updated successfully',
  [PlayerActionTypes.RemoveAvatarSuccess]: 'Avatar removed successfully',

  [PlayerActionTypes.LoadProfileFail]: 'Failed to load profile, please retry',
  [PlayerActionTypes.UpdateProfileFail]: 'Failed to update profile, pleae retry',
  [PlayerActionTypes.RemoveAvatarFail]: 'Failed to remove avatar, please retry',

  [TownActionTypes.RenameSuccess]: 'Town renamed successfully',
  [TownActionTypes.BuildSuccess]: 'Building queued successfully',
  [TownActionTypes.RecruitSuccess]: 'Recruitment queued successfully',
  [TownActionTypes.MoveTroopsSuccess]: 'Troops sent successfully',
  [TownActionTypes.RecallSupportSuccess]: 'Supporting troops recalled successfully',
  [TownActionTypes.SendBackSupportSuccess]: 'Supporting troops sent back successfully',

  [TownActionTypes.RenameFail]: 'Failed to rename town, please retry',
  [TownActionTypes.BuildFail]: 'Failed to queue building, please retry',
  [TownActionTypes.RecruitFail]: 'Failed to queue recruitment, please retry',
  [TownActionTypes.MoveTroopsFail]: 'Failed to send troops, please retry',
  [TownActionTypes.RecallSupportFail]: 'Failed recall supporting troops, please retry',
  [TownActionTypes.SendBackSupportFail]: 'Failed to send back supporting troops, please retry',

  [AllianceActionTypes.CreateSuccess]: 'Alliance created successfully',
  [AllianceActionTypes.CreateInviteSuccess]: 'Player invited successfully',
  [AllianceActionTypes.CancelInviteSuccess]: 'Invite canceled successfully',
  [AllianceActionTypes.RemoveMemberSuccess]: 'Member removed successfully',
  [AllianceActionTypes.UpdateRolePermissionsSuccess]: 'Updated roles successfully',
  [AllianceActionTypes.RemoveRoleSuccess]: 'Removed role successfully',
  [AllianceActionTypes.UpdateMemberRoleSuccess]: 'Updated member role successfully',
  [AllianceActionTypes.RejectInviteSuccess]: 'Rejected alliance invite successfully',
  [AllianceActionTypes.LeaveAllianceSuccess]: 'Left alliance successfully',
  [AllianceActionTypes.DestroySuccess]: 'Destroyed alliance successfully',
  [AllianceActionTypes.ProposeAllianceSuccess]: 'Proposed alliance successfully',
  [AllianceActionTypes.ProposeNapSuccess]: 'Proposed NAP successfully',
  [AllianceActionTypes.CancelAllianceSuccess]: 'Canceled alliance proposal successfully',
  [AllianceActionTypes.CancelNapSuccess]: 'Canceled NAP proposal successfully',
  [AllianceActionTypes.RejectAllianceSuccess]: 'Rejected alliance proposal successfully',
  [AllianceActionTypes.RejectNapSuccess]: 'Rejected NAP proposal successfully',
  [AllianceActionTypes.AcceptAllianceSuccess]: 'Accepted alliance proposal successfully',
  [AllianceActionTypes.AcceptNapSuccess]: 'Accepted NAP proposal successfully',
  [AllianceActionTypes.EndAllianceSuccess]: 'Ended alliance successfully',
  [AllianceActionTypes.EndNapSuccess]: 'Ended NAP successfully',
  [AllianceActionTypes.DeclareWarSuccess]: 'Declared war successfully',
  [AllianceActionTypes.LoadProfileSuccess]: 'Loaded alliance profile successfully',
  [AllianceActionTypes.UpdateProfileSuccess]: 'Updated alliance profile successfully',
  [AllianceActionTypes.RemoveAvatarSuccess]: 'Removed alliance avatar successfully',

  [AllianceActionTypes.CreateFail]: 'Failed to create an alliance, please retry',
  [AllianceActionTypes.CreateInviteFail]: 'Failed to invite target player, please retry',
  [AllianceActionTypes.CancelInviteFail]: 'Failed to cancel invite, please retry',
  [AllianceActionTypes.RemoveMemberFail]: 'Failed to remove member, please retry',
  [AllianceActionTypes.UpdateRolePermissionsFail]: 'Failed to update roles, please retry',
  [AllianceActionTypes.RemoveRoleFail]: 'Failed to remove role, please retry',
  [AllianceActionTypes.UpdateMemberRoleFail]: 'Failed to update member role, please retry',
  [AllianceActionTypes.RejectInviteFail]: 'Failed to reject invite, please retry',
  [AllianceActionTypes.LeaveAllianceFail]: 'Failed to leave alliance, please retry',
  [AllianceActionTypes.DestroyFail]: 'Failed to destroy alliance, please retry',
  [AllianceActionTypes.ProposeAllianceFail]: 'Failed to propose alliance, please retry',
  [AllianceActionTypes.ProposeNapFail]: 'Failed to to propose NAP, please retry',
  [AllianceActionTypes.CancelAllianceFail]: 'Failed to cancel alliance proposal, please retry',
  [AllianceActionTypes.CancelNapFail]: 'Failed to cancel NAP proposal, please retry',
  [AllianceActionTypes.RejectAllianceFail]: 'Failed to reject alliance proposal, please retry',
  [AllianceActionTypes.RejectNapFail]: 'Failed to reject NAP proposal, please retry',
  [AllianceActionTypes.AcceptAllianceFail]: 'Failed to accept alliance proposal, please retry',
  [AllianceActionTypes.AcceptNapFail]: 'Failed to accept NAP proposal, please retry',
  [AllianceActionTypes.EndAllianceFail]: 'Failed to end alliance, please retry',
  [AllianceActionTypes.EndNapFail]: 'Failed to end NAP, please retry',
  [AllianceActionTypes.DeclareWarFail]: 'Failed to declare war, please retry',
  [AllianceActionTypes.LoadProfileFail]: 'Failed to load alliance profile, please retry',
  [AllianceActionTypes.UpdateProfileFail]: 'Failed to update alliance profile, please retry',
  [AllianceActionTypes.RemoveAvatarFail]: 'Failed to remove alliance avatar, please retry',
};

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
  public updates = this.actions$.pipe(
    ofType(
      ...PlayerSuccessActions, ...PlayerFailActions,
      ...TownSuccessActions, ...TownFailActions,
      ...AllianceSuccessActions, ...AllianceFailActions,
    ),
    map((action) => {
      let type = 'info';
      if (action.type.includes('Success')) {
        type = 'success';
      } else if (action.type.includes('Fail')) {
        type = 'fail';
      }
      return {
        type,
        message: actionMessages[action.type]
      };
    })
  ).subscribe((event) => {
    this.snackBar.open(event.message, null, { panelClass: ['snackbar-event', `snackbar-${event.type}`], duration: 1800 });
  });

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

  progressTutorial() {
    this.store.dispatch(new ProgressTutorial());
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
