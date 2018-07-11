import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'strat-ego-common';

import { LoginSuccess, Logout } from './auth.actions';
import { environment } from '../../environments/environment';
import { AuthModuleState } from './reducers';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface AuthResponse { token: string; }

@Injectable()
export class AuthService {
  jwtHelper: JwtHelperService;
  tokenExpirationTimeout;
  user = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router, private store: Store<AuthModuleState>) {
    this.jwtHelper = new JwtHelperService();
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

  login(data) {
    return this.http.post<AuthResponse>(`${environment.server.auth}local`, data).pipe(
      map((response) => response.token),
      tap((token) => this.storeToken(token))
    );
  }

  register(data) {
    return this.http.post<AuthResponse>(`${environment.server.api}users`, data).pipe(
      map((response) => response.token),
      tap((token) => this.storeToken(token))
    );
  }


  tokenExpiration() {
    this.store.dispatch(new Logout());
  }

  getUser() {
    return this.http.get<User>(`${environment.server.api}users/me`);
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

