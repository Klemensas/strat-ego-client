import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { combineLatest, throttleTime, takeWhile, filter, switchMap, map } from 'rxjs/operators';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/never';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { MapAllianceMark, DiplomacyStatus, diplomacyTypeName, Dict, MapTown } from 'strat-ego-common';

import { GameModuleState, getTownState, getPlayerAlliance, getMapData } from '../reducers';
import { MapService, CommandService } from '../services';
import { Town } from '../town/town.model';
import { MapActions, LoadMap } from '../map/map.actions';
import { PlayerActions, SetSidenav } from '../player/player.actions';
import { ViewProfile as viewAllianceProfile } from '../alliance/alliance.actions';
import { ViewProfile as viewPlayerProfile } from '../player/player.actions';
import { getActiveWorld } from '../../reducers';

// TODO: important https://www.chromestatus.com/feature/5424182347169792
// will massively improve performance

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit  {
  public worldData$ = this.store.select(getActiveWorld);
  public townState$ = this.store.select(getTownState);
  public allianceDiplomacy$ = this.store.select(getPlayerAlliance).pipe(
    filter((alliance) => !!alliance),
    map((alliance) => {
        let diplomacy: Dict<string> = {};
        diplomacy = alliance.diplomacyTarget.reduce((result, { status, originAllianceId, type}) => {
          if (status === DiplomacyStatus.ongoing) { result[originAllianceId] = diplomacyTypeName[type]; }
          return result;
        }, diplomacy);
        diplomacy = alliance.diplomacyOrigin.reduce((result, { status, targetAllianceId, type }) => {
          if (status === DiplomacyStatus.ongoing) { result[targetAllianceId] = diplomacyTypeName[type]; }
          return result;
        }, diplomacy);

        return {
          ...diplomacy,
          [alliance.id]: 'member',
        };
    })
  );
  public mapData$ = this.store.select(getMapData);
  public imagesLoaded$ = this.mapService.imagesLoaded;

  constructor(
    private mapService: MapService,
    private store: Store<GameModuleState>,
    private commandService: CommandService,
  ) {}

  public ngOnInit() {
    this.store.dispatch(new LoadMap());
  }

  public onOpenProfile(id: number, type: string) {
    const action = type === 'alliance' ? viewAllianceProfile : viewPlayerProfile;
    this.store.dispatch(new action(id));
  }

  public onOpenCommand(town: MapTown) {
    this.commandService.targeting.next(town.location);
    this.toggleSidenav('left', 'command');
  }

  public toggleSidenav(side: string, name: string) {
    this.store.dispatch(new SetSidenav([{ side, name }]));
  }
}
