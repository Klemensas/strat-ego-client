import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { API, AUTH } from '../config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/cache';

// TODO: split this service into world and player services

@Injectable()
export class GameDataService {
  public data = {
    world: this.getActiveWorlds()
  };

  constructor(private http:Http, private authHttp:AuthHttp) {}

  getActiveWorlds() {
    return this.http.get(`${API}world`)
      .map(t => t.json())
      .cache();
      // .flatMap(t => {
      //   localStorage.setItem('jwt', t);
      //   this.token = t;
      //   return this.getUser();
      // });
  }

  getWorldData(target) {
    return this.authHttp.get(`${API}world/${target}`)
      .map(t => t.json())
      .cache();
      // .flatMap(t => {
      //   localStorage.setItem('jwt', t);
      //   this.token = t;
      //   return this.getUser();
      // });
  }

  joinWorld(target) {
    return this.authHttp.get(`${API}world/${target}/join`)
      .map(t => t.json())
      .cache();
  }

  getPlayerData(target = this.authHttp) {
    return this.authHttp.get(`${API}world/${target}/player`)
      .map(t => t.json())
      .cache();
  }
}
