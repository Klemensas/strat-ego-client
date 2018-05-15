import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { WorldData } from 'strat-ego-common';
// import 'rxjs/add/operator/cache';

import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';

// TODO: split this service into world and player services

@Injectable()
export class GameDataService {
  // public data = {
  //   world: this.getActiveWorlds(),
  //   activeWorld: new BehaviorSubject(null)
  // };

  constructor(private http: Http, private authHttp: AuthHttp) {}

  getActiveWorlds(): Observable<WorldData[]> {
    return this.http.get(`${environment.server.api}world`).pipe(map(t => t.json()));
  }
// .cache();
      // .map(this.mapBuildings)
      // .flatMap(t => {
      //   localStorage.setItem('jwt', t);
      //   this.token = t;
      //   return this.getUser();
      // });

  // getWorldData(target) {
  //   return this.authHttp.get(`${API}world/${target}`)
  //     .map(t => t.json())
  //     .cache();
  //     // .flatMap(t => {
  //     //   localStorage.setItem('jwt', t);
  //     //   this.token = t;
  //     //   return this.getUser();
  //     // });
  // }

  // joinWorld(target) {
  //   return this.authHttp.get(`${API}world/${target}/join`)
  //     .map(t => t.json())
  //     .cache();
  // }

  // getCurrentPlayer(target = this.authHttp) {
  //   return this.authHttp.get(`${API}world/${target}/player`)
  //     .map(t => t.json())
  //     .cache();
  // }
}
