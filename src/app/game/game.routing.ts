import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard }  from '../auth.guard';

import { GameContainerComponent }    from './game-container';
import { RestaurantComponent }    from './restaurant';
import { MapComponent }    from './map';

const gameRoutes: Routes = [
  {
    path: 'world/:name',
    canActivate: [AuthGuard],
    component: GameContainerComponent,
    children: [
      { path: '', component: RestaurantComponent/*, resolve: { player: PlayerResolver }*/}, // should a separate path be used for joining?
        { path: 'map', component: MapComponent },
    ],
  },
  // { path: 'hero/:id', component: HeroDetailComponent }
];

export const gameRouting: ModuleWithProviders = RouterModule.forChild(gameRoutes);

export const gameComponents = [GameContainerComponent, RestaurantComponent, MapComponent];