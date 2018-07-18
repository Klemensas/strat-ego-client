import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/';
import { AuthGuard } from './auth.guard';
import { FullGuard } from './full.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'manage',
    canActivate: [AuthGuard],
    data: { role: 'admin' },
    component: HomeComponent
  },
  {
    path: 'world/:name',
    canActivate: [/* AuthGuard, SocketGuard, WorldGuard */ FullGuard],
    loadChildren: 'app/game/game.module#GameModule'
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [HomeComponent];
