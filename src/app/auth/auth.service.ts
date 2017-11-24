import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { StoreState } from '../store';
import { AuthActions } from '../store/auth/auth.actions';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper;
  tokenExpirationTimeout;
  user = new BehaviorSubject(null);

  constructor(private http: Http, private authHttp: AuthHttp, private router: Router, private store: Store<StoreState>) {
    this.jwtHelper = new JwtHelper();
  }

  getToken() {
    const token = localStorage.getItem('jwt');

    if (!token || this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('jwt');
      return false;
    }
    // this.tokenData = this.jwtHelper.decodeToken(token);
    this.store.dispatch({ type: AuthActions.LOGIN_SUCCESS, payload: token });
  }

  storeToken(token) {
    const tokenExpires = new Date(this.jwtHelper.getTokenExpirationDate(token)).getTime()
    this.tokenExpirationTimeout = setTimeout(this.tokenExpiration, tokenExpires - Date.now())
    localStorage.setItem('jwt', token);
    return token;
  }

  removeToken() {
    clearTimeout(this.tokenExpirationTimeout);
    localStorage.removeItem('jwt');
  }

  login(data) {
    return this.http.post(`${environment.server.auth}local`, data)
      .map(token => token.json().token)
      .map(token => this.storeToken(token));
  }

  register(data) {
    return this.http.post(`${environment.server.api}users`, data)
      .map(token => token.json().token)
      .map(token => this.storeToken(token));
  }

  logout() {
    this.removeToken();
    this.store.dispatch({ type: AuthActions.LOGOUT })
  }

  tokenExpiration() {
    console.log('token expired');
    this.logout();
  }

  getUser(): Observable<any> {
    return this.authHttp.get(`${environment.server.api}users/me`)
      .map(data => data.json())
      // .cache();

      // user$.subscribe(
      //   u => this.user.next(u),
      //   err => {
      //     this.logout();
      //     console.error('get user error', err)
      //   }
      // );


      // return user$;
  }
}

