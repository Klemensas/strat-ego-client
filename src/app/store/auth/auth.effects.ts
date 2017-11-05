import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { of } from 'rxjs/observable/of';

import { ActionWithPayload } from '../util';
import { AuthService } from '../../auth/auth.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  public checkToken$: Observable<ActionWithPayload> = this.actions$
    .ofType(ROOT_EFFECTS_INIT)
    .do(() => this.authService.getToken());

  @Effect()
  public login$: Observable<ActionWithPayload> = this.actions$
    .ofType(AuthActions.LOGIN)
    .map((action: ActionWithPayload) => action.payload)
    .switchMap((credentials) => this.authService.login(credentials)
    .map((user) => ({ type: AuthActions.LOGIN_SUCCESS, payload: user }))
    .catch((error) => of({ type: AuthActions.LOGIN_FAIL, payload: error }))
  );

  @Effect()
  public profile$: Observable<ActionWithPayload> = this.actions$
    .ofType(AuthActions.LOGIN_SUCCESS)
    .map((action: ActionWithPayload) => action.payload)
    .switchMap(() => this.authService.getUser()
      .map((user) => ({ type: AuthActions.LOAD_PROFILE_SUCCESS, payload: user }))
      .catch((error) => of({ type: AuthActions.LOAD_PROFILE_FAIL, payload: error }))
    );

  @Effect({ dispatch: false })
  public loginError$: Observable<any> = this.actions$
    .ofType(AuthActions.LOAD_PROFILE_FAIL)
    .map(() => this.authService.removeToken());

  @Effect()
  public register$: Observable<ActionWithPayload> = this.actions$
    .ofType(AuthActions.REGISTER)
    .map((action: ActionWithPayload) => action.payload)
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
