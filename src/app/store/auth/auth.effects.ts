import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { of } from 'rxjs/observable/of';

import { AuthService } from '../../auth/auth.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  public login$: Observable<Action> = this.actions$
    .ofType(AuthActions.LOGIN)
    .map(toPayload)
    .switchMap((credentials) => this.authService.login(credentials)
      .map((user) => ({ type: AuthActions.LOGIN_SUCCESS, payload: user }))
      .catch((error) => of({ type: AuthActions.LOGIN_FAIL, payload: error }))
    );

  @Effect()
  public profile$: Observable<Action> = this.actions$
    .ofType(AuthActions.LOGIN_SUCCESS)
    .map(toPayload)
    .switchMap(() => this.authService.getUser()
      .map((user) => ({ type: AuthActions.LOAD_PROFILE_SUCCESS, payload: user }))
      .catch((error) => of({ type: AuthActions.LOAD_PROFILE_FAIL, payload: error }))
    );

  @Effect({ dispatch: false })
  public loginError$: Observable<any> = this.actions$
    .ofType(AuthActions.LOAD_PROFILE_FAIL)
    .map(() => this.authService.removeToken());

  public register$: Observable<Action> = this.actions$
    .ofType(AuthActions.REGISTER)
    .map(toPayload)
    .switchMap((credentials) => this.authService.register(credentials)
      .map((user) => ({ type: AuthActions.REGISTER_SUCCESS, payload: user }))
      .catch((error) => of({ type: AuthActions.REGISTER_FAIL, payload: error }))
    );

  // @Effect({ dispatch: false })
  // public loginSuccess$: Observable<any> = this.actions$
  //   .ofType(AuthActions.LOGIN_SUCCESS)
  //   .map(toPayload)
  //   .map((user) => this.httpService.setAuthToken(user.token));

  @Effect({ dispatch: false })
  public logout$: Observable<any> = this.actions$
    .ofType(AuthActions.LOGOUT)
    .map(() => console.log('go to page'))
    .do(() => this.router.navigate(['/']));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}
}
