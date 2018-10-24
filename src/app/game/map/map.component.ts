import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { DiplomacyStatus, diplomacyTypeName, Dict, MapTown } from 'strat-ego-common';

import {
  GameModuleState,
  getTownState,
  getPlayerAlliance,
  getMapData,
  getPlayerEntities,
  getAllianceEntities,
  getTownEntities,
} from '../reducers';
import { MapService, CommandService } from '../services';
import { LoadMap } from '../map/map.actions';
import { SetSidenav } from '../menu/menu.actions';
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


  public mapData$ = combineLatest(
    this.store.select(getMapData),
    this.store.select(getTownEntities),
    this.store.select(getPlayerEntities),
    this.store.select(getAllianceEntities),
    (mapData, townEntities, playerEntities, allianceEntities) => Object.entries(mapData).reduce((result, [coords, id]) => {
      const targetTown = { ...townEntities[id] };
      if (targetTown.playerId) {
        const player = playerEntities[targetTown.playerId];
        targetTown.player = player;

        if (player && player.allianceId) {
          targetTown.alliance = allianceEntities[targetTown.player.allianceId];
        }
      }

      result[coords] = targetTown;
      return result;
    }, {})
  ).pipe(tap((d) => console.log('d', d)));
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
