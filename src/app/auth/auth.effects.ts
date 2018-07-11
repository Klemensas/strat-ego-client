import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ROOT_EFFECTS_INIT, ofType } from '@ngrx/effects';
import { Observable ,  of ,  defer } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import * as authActions from './auth.actions';
import { Action } from '@ngrx/store';
import { SocketService } from '../game/services';

@Injectable()
export class AuthEffects {
  @Effect()
  public login$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.Login>(authActions.AuthActionTypes.Login),
    map((action) => action.payload),
    switchMap((credentials) =>
      this.authService.login(credentials).pipe(
        map((token) => new authActions.LoginSuccess(token)),
        catchError((error) => of(new authActions.LoginFail(error)))
      )
    ),
  );

  @Effect()
  public profile$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.LoginSuccess | authActions.RegisterSuccess>(authActions.AuthActionTypes.LoginSuccess, authActions.AuthActionTypes.RegisterSuccess),
    switchMap(() =>
      this.authService.getUser().pipe(
        map((user) => new authActions.LoadProfileSuccess(user)),
        catchError((error) => of(new authActions.LoadProfileFail(error)))
      )
    ),
  );

  @Effect({ dispatch: false })
  public loginError$: Observable<any> = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.LoadProfileFail),
    map(() => this.authService.removeToken())
  );

  @Effect()
  public register$: Observable<any> = this.actions$.pipe(
    ofType<authActions.Register>(authActions.AuthActionTypes.Register),
    map((action) => action.payload),
    switchMap((credentials) =>
      this.authService.register(credentials).pipe(
        map((token) => new authActions.RegisterSuccess(token)),
        catchError((error) => of(new authActions.RegisterFail(error)))
      ),
    ),
  );

  @Effect({ dispatch: false })
  public logout$: Observable<any> = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.Logout),
    tap(() => {
      this.authService.removeToken();
      this.socketService.disconnect();
      this.router.navigate(['/']);
    })
  );

  @Effect({ dispatch: false })
  public checkToken$ = defer(() => of(this.authService.getToken()));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private socketService: SocketService,
    private router: Router,
  ) {}
}
