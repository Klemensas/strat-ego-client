import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, withLatestFrom, filter } from 'rxjs/operators';

import * as playerActions from './player.actions';
import { SocketService } from '../../game/services/socket.service';
import { GameModuleState, getPlayers, getPlayerEntities } from '../reducers';
import { LoadProfilesSuccess, TownActionTypes } from '../town/town.actions';
import { RankingsActionTypes, LoadSuccess } from '../rankings/rankings.actions';
import { SetSidenav } from '../menu/menu.actions';

@Injectable()
export class PlayerEffects {
  @Effect({ dispatch: false })
  public restart$: Observable<any> = this.actions$.pipe(
    ofType<playerActions.Restart>(playerActions.PlayerActionTypes.Restart),
    map((data) => this.socketService.sendEvent('player:restart'))
  );

  @Effect()
  public viewProfile$: Observable<any> = this.actions$.pipe(
    ofType<playerActions.ViewProfile>(playerActions.PlayerActionTypes.ViewProfile),
    map((action) => action.payload),
    withLatestFrom(this.store.select(getPlayers)),
    map(([payload, players]) => {
      const player = players[payload];
      if (!player) { this.socketService.sendEvent('player:getProfile', payload); }
      return new SetSidenav([{ side: 'right', name: 'playerProfile' }]);
    })
  );

  @Effect({ dispatch: false })
  public updateProfile$: Observable<any> = this.actions$.pipe(
    ofType<playerActions.UpdateProfile>(playerActions.PlayerActionTypes.UpdateProfile),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('player:updateProfile', payload))
  );

  @Effect({ dispatch: false })
  public removeAvatar$: Observable<any> = this.actions$.pipe(
    ofType<playerActions.RemoveAvatar>(playerActions.PlayerActionTypes.RemoveAvatar),
    map(() => this.socketService.sendEvent('player:removeAvatar'))
  );

  @Effect({ dispatch: false })
  public progressTutorial$: Observable<any> = this.actions$.pipe(
    ofType<playerActions.ProgressTutorial>(playerActions.PlayerActionTypes.ProgressTutorial),
    map(() => this.socketService.sendEvent('player:progressTutorial'))
  );

  @Effect()
  public loadMissingProfilesFromTowns$: Observable<any> = this.actions$.pipe(
    ofType<LoadProfilesSuccess>(TownActionTypes.LoadProfilesSuccess),
    withLatestFrom(this.store.select(getPlayerEntities)),
    map(([action, entities]) => [...Object.values(action.payload).reduce((result, { playerId}) => {
      if (playerId !== null && !entities[playerId]) { result.add(playerId); }
      return result;
    }, new Set())]),
    filter((missingProfiles) => !!missingProfiles.length),
    map((payload) =>  new playerActions.LoadProfiles(payload)),
  );

  @Effect()
  public loadMissingProfilesFromRankings$: Observable<any> = this.actions$.pipe(
    ofType<LoadSuccess>(RankingsActionTypes.LoadSuccess),
    withLatestFrom(this.store.select(getPlayerEntities)),
    map(([action, entities]) => Object.values(action.payload.rankings).reduce((result, playerId) => {
      if (playerId !== null && !entities[playerId]) {
        result.push(playerId);
      }
      return result;
    }, [])),
    filter((missingProfiles) => !!missingProfiles.length),
    map((payload) => new playerActions.LoadProfiles(payload)),
  );


  @Effect({ dispatch: false })
  public loadProfiles$: Observable<any> = this.actions$.pipe(
    ofType<playerActions.LoadProfiles>(playerActions.PlayerActionTypes.LoadProfiles),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('profile:loadPlayers', payload)),
  );

  constructor(
    private actions$: Actions,
    private socketService: SocketService,
    private store: Store<GameModuleState>
  ) {
    this.socketService.registerEvents([
      ['initialize', (payload) => this.store.dispatch(new playerActions.Initialize(payload.player))],
      ['player', (payload) => this.store.dispatch(new playerActions.Update(payload))],
      ['player:updateProfileSuccess', (payload) => this.store.dispatch(new playerActions.UpdateProfileSuccess(payload))],
      ['player:updateProfileFail', (payload) => this.store.dispatch(new playerActions.UpdateProfileFail(payload))],
      ['player:removeAvatarSuccess', (payload) => this.store.dispatch(new playerActions.RemoveAvatarSuccess(payload))],
      ['player:removeAvatarFail', (payload) => this.store.dispatch(new playerActions.RemoveAvatarSuccess(payload))],
      ['player:progressTutorialSuccess', () => this.store.dispatch(new playerActions.ProgressTutorialSuccess())],
      ['player:progressTutorialFail', (payload) => this.store.dispatch(new playerActions.ProgressTutorialFail(payload))],
      ['player:addReport', (payload) => this.store.dispatch(new playerActions.AddReport(payload))],

      ['profile:loadPlayersSuccess', (payload) => this.store.dispatch(new playerActions.LoadProfilesSuccess(payload))],
      ['profile:loadPlayersFail', (payload) => this.store.dispatch(new playerActions.LoadProfilesFail(payload))],
      ]);

  }
}
