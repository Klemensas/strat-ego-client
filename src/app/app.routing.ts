  import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/';
import { LoginComponent } from './auth/login/';
import { RegisterComponent } from './auth/register/';
import { GameComponent } from './game/game.component/';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, /*index: true*/ },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'world/:name', component: GameComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [HomeComponent, LoginComponent, RegisterComponent, GameComponent];