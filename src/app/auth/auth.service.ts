import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthActions, LoginSuccess, Logout } from './auth.actions';
import { environment } from '../../environments/environment';
import { User } from './user/user.model';
import { AuthModuleState } from './reducers';

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper;
  tokenExpirationTimeout;
  user = new BehaviorSubject(null);

  constructor(private http: Http, private authHttp: AuthHttp, private router: Router, private store: Store<AuthModuleState>) {
    this.jwtHelper = new JwtHelper();
  }

  getToken() {
    const token = localStorage.getItem('jwt');

    if (!token || this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('jwt');
      return false;
    }
    // this.tokenData = this.jwtHelper.decodeToken(token);
    this.store.dispatch(new LoginSuccess(token));
  }

  storeToken(token) {
    const tokenExpires = new Date(this.jwtHelper.getTokenExpirationDate(token)).getTime();
    this.tokenExpirationTimeout = setTimeout(this.tokenExpiration, tokenExpires - Date.now());
    localStorage.setItem('jwt', token);
    return token;
  }

  removeToken() {
    clearTimeout(this.tokenExpirationTimeout);
    localStorage.removeItem('jwt');
  }

  login(data): Observable<string> {
    return this.http.post(`${environment.server.auth}local`, data).pipe(
      map(token => token.json().token),
      tap(token => this.storeToken(token))
    );
  }

  register(data): Observable<string> {
    return this.http.post(`${environment.server.api}users`, data).pipe(
      map(token => token.json().token),
      tap(token => this.storeToken(token))
    );
  }


  tokenExpiration() {
    console.log('token expired');
    this.store.dispatch(new Logout());
  }

  getUser(): Observable<User> {
    return this.authHttp.get(`${environment.server.api}users/me`).pipe(
      map(data => data.json())
    );
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

