import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';

import { ReportActions } from './report.actions';
import { TownActions } from '../town';
import { StoreState } from '../';

@Injectable()
export class ReportEffects {
  // @Effect()
  // public update$: Observable<Action> = this.actions$
  //   .ofType(ReportActions.UPDATE)
  //   .map(toPayload)
  //   .map((data) => ({ type: TownActions.SET_REPORT_TOWNS, payload: data.Towns }))
    // .switchMap((credentials) => this.store.disp(credentials)
  //     .map((user) => ({ type: AuthActions.LOGIN_SUCCESS, payload: user }))
  //     .catch((error) => of({ type: AuthActions.LOGIN_FAIL, payload: error }))
    // );

  // @Effect()
  // public profile$: Observable<Action> = this.actions$
  //   .ofType(AuthActions.LOGIN_SUCCESS)
  //   .map(toPayload)
  //   .switchMap(() => this.authService.getUser()
  //     .map((user) => ({ type: AuthActions.LOAD_PROFILE_SUCCESS, payload: user }))
  //     .catch((error) => of({ type: AuthActions.LOAD_PROFILE_FAIL, payload: error }))
  //   );

  // public register$: Observable<Action> = this.actions$
  //   .ofType(AuthActions.REGISTER)
  //   .map(toPayload)
  //   .switchMap((credentials) => this.authService.register(credentials)
  //     .map((user) => ({ type: AuthActions.REGISTER_SUCCESS, payload: user }))
  //     .catch((error) => of({ type: AuthActions.REGISTER_FAIL, payload: error }))
  //   );

  // // @Effect({ dispatch: false })
  // // public loginSuccess$: Observable<any> = this.actions$
  // //   .ofType(AuthActions.LOGIN_SUCCESS)
  // //   .map(toPayload)
  // //   .map((user) => this.httpService.setAuthToken(user.token));

  // @Effect({ dispatch: false })
  // public logout$: Observable<any> = this.actions$
  //   .ofType(AuthActions.LOGOUT)
  //   .map(() => this.authService.logout())
  //   .do(() => this.router.navigate(['/admin']));

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<StoreState>,
  ) {}
}
