  import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/';
import { LoginComponent } from './auth/login/';
import { RegisterComponent } from './auth/register/';
import { GameComponent } from './game/game.component/';
import { AuthGuard } from './auth.guard';
import { PlayerResolver } from './player.resolver';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, /*index: true*/ },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'world/:name',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: GameComponent, resolve: { player: PlayerResolver }}, // should a separate path be used for joining?
      { path: 'join', data: { new: true }, component: GameComponent, resolve: { player: PlayerResolver }}, // should a separate path be used for joining?
    ]
  },
  {
    path: 'manage',
    canActivate: [AuthGuard],
    data: { role: 'admin' },
    component: HomeComponent
  },
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [HomeComponent, LoginComponent, RegisterComponent, GameComponent];