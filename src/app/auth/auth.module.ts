import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router/';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule, MatInputModule } from '@angular/material';

import { AuthEffects } from './auth.effects';
import { reducers } from './reducers';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';

const pages = [
  LoginComponent,
  RegisterComponent,
];

@NgModule({
  declarations: pages,
  imports: [
    MatButtonModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]),
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
    AuthService,
  ],
})
export class AuthModule {}
