import { Injectable } from '@angular/core';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/cache';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { API, AUTH } from '../config';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  jwtHelper;
  token;
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
    this.getUser()
  }

  login(data) {
    return this.http.post(`${AUTH}local`, data)
      .map(t => t.json().token)
      .flatMap(t => {
        localStorage.setItem('jwt', t);
        this.token = t;
        return this.getUser();
      });
  }

  logout() {
    this.token = null;
    localStorage.removeItem('jwt');
    this.user.next(null);
  }

  tokenExpiration() {
    this.token = null;
    this.user.next(null);
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  getUser() {
    const user$ = this.authHttp.get(`${API}users/me`)
      .map(u => u.json())
      .cache();

      user$.subscribe(
        u => this.user.next(u),
        err => console.error('get user error', err)
      );

      const tokenExpires = new Date(this.jwtHelper.getTokenExpirationDate(this.token)).getTime()
      this.tokenExpirationTimeout = setTimeout(this.tokenExpiration, tokenExpires - Date.now())

      return user$;
  }

}
