import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/';
import { LoginComponent } from './auth/login/';
import { RegisterComponent } from './auth/register/';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component:
  RegisterComponent },
  {
    path: 'manage',
    canActivate: [AuthGuard],
    data: { role: 'admin' },
    component: HomeComponent
  },
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [HomeComponent, LoginComponent, RegisterComponent];
