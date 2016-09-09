import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameContainerComponent }    from './game-container';
import { RestaurantComponent }    from './restaurant';
import { MapComponent }    from './map';
// import { HeroDetailComponent }  from './hero-detail.component';

const gameRoutes: Routes = [
  // { path: 'game', component: GameContainerComponent },
  {
    path: 'world/:name',
    // canActivate: [AuthGuard],
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