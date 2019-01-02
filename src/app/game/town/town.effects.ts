import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import { map, withLatestFrom, filter, take } from 'rxjs/operators';

import {
  TownActionTypes,
  SetActiveTown,
  Rename,
  Recruit,
  RenameSuccess,
  RenameFail,
  Build,
  BuildSuccess,
  BuildFail,
  RecruitSuccess,
  RecruitFail,
  MoveTroopsSuccess,
  MoveTroopsFail,
  MoveTroops,
  RecallSupport,
  SendBackSupport,
  RecallSupportSuccess,
  RecallSupportFail,
  SendBackSupportSuccess,
  SendBackSupportFail,
  IncomingMovement,
  SupportRecalled,
  SupportSentBack,
  Lost,
  Conquered,
  SupportDisbanded,
  SentSupportDestroyed,
  SentSupportUpdated,
  MovementDisbanded,
  Initialize,
  LoadProfilesSuccess,
  LoadProfiles,
  SupportArrived,
  SupportStationed,
  BuildingCompleted,
  RecruitmentCompleted,
  Attacked,
  AttackOutcome,
  TroopsReturned
} from './town.actions';

import { Update as UpdateMap } from '../map/map.actions';
import { GameModuleState, getActiveTown, getTownState } from '../reducers';
import { SocketService } from '../../game/services/socket.service';
import { MapActionTypes } from '../map/map.actions';

@Injectable()
export class TownEffects {
  @Effect()
  public setActiveTown$: Observable<Action> = this.actions$.pipe(
    ofType<Initialize>(TownActionTypes.Initialize),
    map((action) => action.payload),
    withLatestFrom(this.store.select(getTownState)),
    filter(([towns, townState]) => towns.length && !townState.activeTown),
    map(([towns]) => new SetActiveTown(towns[0].id))
  );

  // TODO: consider is this efficient, alternatively lod profiles only as needed
  @Effect()
  public loadAllProfiles$: Observable<Action> = this.actions$.pipe(
    ofType<Initialize>(TownActionTypes.Initialize),
    map(() => new LoadProfiles([]))
  );

  @Effect({ dispatch: false })
  public rename$: Observable<any> = this.actions$.pipe(
    ofType<Rename>(TownActionTypes.Rename),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('town:rename', payload))
  );

  @Effect({ dispatch: false })
  public build$: Observable<any> = this.actions$.pipe(
    ofType<Build>(TownActionTypes.Build),
    map((action) => action.payload),
    withLatestFrom(this.store.select(getActiveTown)),
    map(([{ building, level }, town]) => this.socketService.sendEvent('town:build', { building, level, town: town.id }))
  );

  @Effect({ dispatch: false })
  public recruit$: Observable<any> = this.actions$.pipe(
    ofType<Recruit>(TownActionTypes.Recruit),
    map((action) => action.payload),
    withLatestFrom(this.store.select(getActiveTown)),
    map(([units, town]) => this.socketService.sendEvent('town:recruit', { units, town: town.id }))
  );

  @Effect({ dispatch: false })
  public moveTroops$: Observable<any> = this.actions$.pipe(
    ofType<MoveTroops>(TownActionTypes.MoveTroops),
    map((action) => action.payload),
    withLatestFrom(this.store.select(getActiveTown)),
    map(([payload, town]) => this.socketService.sendEvent('town:moveTroops', { ...payload, town: town.id }))
  );

  @Effect({ dispatch: false })
  public recallSupport$: Observable<any> = this.actions$.pipe(
    ofType<RecallSupport>(TownActionTypes.RecallSupport),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('town:recallSupport', payload))
  );

  @Effect({ dispatch: false })
  public sendBackSupport$: Observable<any> = this.actions$.pipe(
    ofType<SendBackSupport>(TownActionTypes.SendBackSupport),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('town:sendBackSupport', payload))
  );

  @Effect()
  public loadPlayerTownProfiles$: Observable<any> = this.actions$.pipe(
    ofType<UpdateMap>(MapActionTypes.Update),
    withLatestFrom(this.store.select(getTownState)),
    map(([action, townState]) => Object.values(action.payload).filter((id) => !townState.entities[id] && !townState.loadingIds[id])),
    filter((missingProfiles) => !!missingProfiles.length),
    map((payload) => new LoadProfiles(payload)),
  );

  @Effect({ dispatch: false })
  public loadProfiles$: Observable<any> = this.actions$.pipe(
    ofType<LoadProfiles>(TownActionTypes.LoadProfiles),
    map((action) => action.payload),
    map((payload) => this.socketService.sendEvent('profile:loadTowns', payload)),
  );

  constructor(
    private actions$: Actions,
    private store: Store<GameModuleState>,
    private socketService: SocketService,
  ) {
    this.socketService.registerEvents([
      ['initialize', (payload) => this.store.dispatch(new Initialize(payload.towns))],
      ['town:renameSuccess', (payload) => this.store.dispatch(new RenameSuccess(payload))],
      ['town:renameFail', (payload) => this.store.dispatch(new RenameFail(payload))],
      ['town:buildSuccess', (payload) => this.store.dispatch(new BuildSuccess(payload))],
      ['town:buildFail', (payload) => this.store.dispatch(new BuildFail(payload))],
      ['town:recruitSuccess', (payload) => this.store.dispatch(new RecruitSuccess(payload))],
      ['town:recruitFail', (payload) => this.store.dispatch(new RecruitFail(payload))],
      ['town:moveTroopsSuccess', (payload) => this.store.dispatch(new MoveTroopsSuccess(payload))],
      ['town:moveTroopsFail', (payload) => this.store.dispatch(new MoveTroopsFail(payload))],
      ['town:recallSupportSuccess', (payload) => this.store.dispatch(new RecallSupportSuccess(payload))],
      ['town:recallSupportFail', (payload) => this.store.dispatch(new RecallSupportFail(payload))],
      ['town:sendBackSupportSuccess', (payload) => this.store.dispatch(new SendBackSupportSuccess(payload))],
      ['town:sendBackSupportFail', (payload) => this.store.dispatch(new SendBackSupportFail(payload))],
      ['town:incomingMovement', (payload) => this.store.dispatch(new IncomingMovement(payload))],
      ['town:supportRecalled', (payload) => this.store.dispatch(new SupportRecalled(payload))],
      ['town:supportSentBack', (payload) => this.store.dispatch(new SupportSentBack(payload))],
      ['town:attackOutcome', (payload) => this.store.dispatch(new AttackOutcome(payload))],
      ['town:attacked', (payload) => this.store.dispatch(new Attacked(payload))],
      ['town:lost', (payload) => this.store.dispatch(new Lost(payload))],
      ['town:supportArrived', (payload) => this.store.dispatch(new SupportArrived(payload))],
      ['town:supportStationed', (payload) => this.store.dispatch(new SupportStationed(payload))],
      ['town:buildingCompleted', (payload) => this.store.dispatch(new BuildingCompleted(payload))],
      ['town:recruitmentCompleted', (payload) => this.store.dispatch(new RecruitmentCompleted(payload))],
      ['town:supportStationed', (payload) => this.store.dispatch(new SupportStationed(payload))],
      ['town:supportDisbanded', (payload) => this.store.dispatch(new SupportDisbanded(payload))],
      ['town:sentSupportDestroyed', (payload) => this.store.dispatch(new SentSupportDestroyed(payload))],
      ['town:sentSupportUpdated', (payload) => this.store.dispatch(new SentSupportUpdated(payload))],
      ['town:movementDisbanded', (payload) => this.store.dispatch(new MovementDisbanded(payload))],
      ['town:conquered', (payload) => this.store.dispatch(new Conquered(payload))],
      ['town:troopsReturned', (payload) => this.store.dispatch(new TroopsReturned(payload))],

      ['profile:loadTownsSuccess', (payload) => this.store.dispatch(new LoadProfilesSuccess(payload)) ]
    ]);
  }
}
