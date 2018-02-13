import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameContainerComponent } from './game-container';
import { TownComponent } from './town';
import { MapComponent } from './map';
import { RecruitComponent } from './recruit/recruit.component';
import { CommandComponent } from './command/command.component';
import { MovementsComponent } from './movements/movements.component';

import { FullGuard } from '../full.guard';
import { AllianceComponent } from '../game/alliance/alliance.component';

const gameRoutes: Routes = [
  {
    path: '',
    component: GameContainerComponent,
    children: [
      { path: '', redirectTo: 'town', pathMatch: 'full' },
      { path: 'town', component: TownComponent/*, resolve: { player: PlayerResolver }*/}, // should a separate path be used for joining?
      { path: 'alliance', component: AllianceComponent },
      { path: 'map', component: MapComponent },
      { path: 'recruit', component: RecruitComponent, pathMatch: 'prefix', outlet: 'popupRight'},
      { path: 'command', component: CommandComponent, pathMatch: 'prefix', outlet: 'popupLeft' },
      { path: 'movements', component: MovementsComponent, pathMatch: 'prefix', outlet: 'popupLeft' },
    ],
  },
];

export const gameRouting: ModuleWithProviders = RouterModule.forChild(gameRoutes);

export const gameComponents = [GameContainerComponent, TownComponent, MapComponent, RecruitComponent];
