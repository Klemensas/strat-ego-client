import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameContainerComponent } from './game-container';
import { TownComponent } from './town';
import { MapComponent } from './map';
import { RecruitComponent } from './recruit/recruit.component';
import { CommandComponent } from './command/command.component';
import { MovementComponent } from './movement/movement.component';

import { FullGuard } from '../full.guard';

const gameRoutes: Routes = [
  {
    path: '',
    component: GameContainerComponent,
    children: [
      { path: '', redirectTo: 'town', pathMatch: 'full' },
      { path: 'town', component: TownComponent/*, resolve: { player: PlayerResolver }*/}, // should a separate path be used for joining?
      { path: 'map', component: MapComponent },
      { path: 'recruit', component: RecruitComponent, pathMatch: 'prefix', outlet: 'popupRight'},
      { path: 'command', component: CommandComponent, pathMatch: 'prefix', outlet: 'popupLeft' },
      { path: 'movement', component: MovementComponent, pathMatch: 'prefix', outlet: 'popupLeft' },
    ],
  },
];

export const gameRouting: ModuleWithProviders = RouterModule.forChild(gameRoutes);

export const gameComponents = [GameContainerComponent, TownComponent, MapComponent, RecruitComponent];
