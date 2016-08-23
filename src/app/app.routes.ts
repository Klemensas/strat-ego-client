import { provideRouter, RouterConfig } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/';
import { LoginComponent } from './auth/login/';
import { GameComponent } from './game/game.component/';
import { AuthGuard } from './auth.guard';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent, /*index: true*/ },
  { path: 'login', component: LoginComponent },
  { path: 'game', component: GameComponent, canActivate: [AuthGuard] }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AuthGuard
];