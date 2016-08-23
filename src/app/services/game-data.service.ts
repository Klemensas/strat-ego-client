import { Injectable } from '@angular/core';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { API, AUTH } from '../config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/cache';

@Injectable()
export class GameDataService {
  public worldData = this.getActiveWorlds();
  constructor(private http:Http, private authHttp:AuthHttp) {}

  getActiveWorlds() {
    return this.http.get(`${API}game/worlds`)
      .map(t => t.json())
      .cache();
      // .flatMap(t => {
      //   localStorage.setItem('jwt', t);
      //   this.token = t;
      //   return this.getUser();
      // });
  }

}
