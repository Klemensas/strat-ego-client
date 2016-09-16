import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard }  from '../auth.guard';

import { GameContainerComponent }    from './game-container';
import { TownComponent }    from './town';
import { MapComponent }    from './map';

import { WorldResolver } from './services/world.resolver';

const gameRoutes: Routes = [
  {
    path: 'world/:name',
    canActivate: [AuthGuard],
    component: GameContainerComponent,
    children: [
      { path: '', component: TownComponent/*, resolve: { player: PlayerResolver }*/}, // should a separate path be used for joining?
        { path: 'map', component: MapComponent },
    ],
    resolve: {
      world: WorldResolver
    }
  },
  // { path: 'hero/:id', component: HeroDetailComponent }
];

export const gameRouting: ModuleWithProviders = RouterModule.forChild(gameRoutes);

export const gameComponents = [GameContainerComponent, TownComponent, MapComponent];