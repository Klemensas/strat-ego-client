import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth.guard';

import { GameContainerComponent } from './game-container';
import { TownComponent } from './town';
import { MapComponent } from './map';
import { RecruitComponent } from './recruit/recruit.component';
import { CommandComponent } from './command/command.component';
import { MovementsComponent } from './movements/movements.component';

import { WorldGuard } from './services/world.guard';
import { FullGuard } from '../full.guard';
import { SocketGuard } from './services/socket.guard';

const gameRoutes: Routes = [
  {
    path: 'world/:name',
    canActivate: [/* AuthGuard, SocketGuard, WorldGuard */ FullGuard],
    component: GameContainerComponent,
    children: [
      { path: '', redirectTo: 'town', pathMatch: 'full' },
      { path: 'town', component: TownComponent/*, resolve: { player: PlayerResolver }*/}, // should a separate path be used for joining?
      { path: 'map', component: MapComponent },
      { path: 'recruit', component: RecruitComponent, pathMatch: 'prefix', outlet: 'popupRight'},
      { path: 'command', component: CommandComponent, pathMatch: 'prefix', outlet: 'popupLeft' },
      { path: 'movements', component: MovementsComponent, pathMatch: 'prefix', outlet: 'popupLeft' },
    ],
  },
];

export const gameRouting: ModuleWithProviders = RouterModule.forChild(gameRoutes);

export const gameComponents = [GameContainerComponent, TownComponent, MapComponent, RecruitComponent];
