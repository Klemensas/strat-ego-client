import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/cache';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  jwtHelper;
  token;
  tokenData;
  tokenExpirationTimeout
  user = new BehaviorSubject(null);

  constructor(private http:Http, private authHttp:AuthHttp, private router:Router) {
    this.jwtHelper = new JwtHelper();
    this.getToken();
  }

  getToken() {
    const token = localStorage.getItem('jwt');

    if (!token || this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('jwt');
      return false;
    }
    this.token = token;
    this.tokenData = this.jwtHelper.decodeToken(token);
    // TODO: upgrade this
    this.getUser().subscribe()
  }

  login(data) {
    return this.http.post(`${environment.server.auth}local`, data)
      .map(token => token.json().token)
      .flatMap(token => {
        localStorage.setItem('jwt', token);
        this.token = token;
        this.tokenData = this.jwtHelper.decodeToken(token);
        return this.getUser();
      });
  }

  logout() {
    console.log('logout');
    this.token = null;
    this.tokenData = null;
    localStorage.removeItem('jwt');
    this.user.next(null);
    this.router.navigate(['/']);
  }

  tokenExpiration() {
    console.log('token expired');
    this.token = null;
    this.user.next(null);
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  getUser() {
    const tokenExpires = new Date(this.jwtHelper.getTokenExpirationDate(this.token)).getTime()
    this.tokenExpirationTimeout = setTimeout(this.tokenExpiration, tokenExpires - Date.now())
    return this.authHttp.get(`${environment.server.api}users/me`)
      .map(data => data.json())
      .map(data => {
        this.user.next(data);
        return data;
      })
      .cache();

      // user$.subscribe(
      //   u => this.user.next(u),
      //   err => {
      //     this.logout();
      //     console.error('get user error', err)
      //   }
      // );


      // return user$;
  }

  isLoggedIn() {
    return !this.jwtHelper.isTokenExpired(this.token);
  }

  hasRole(role) {
    return this.tokenData.role === role;
  }

}

