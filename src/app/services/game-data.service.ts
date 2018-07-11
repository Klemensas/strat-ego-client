import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { WorldData } from 'strat-ego-common';
// import 'rxjs/add/operator/cache';

import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

// TODO: split this service into world and player services

@Injectable()
export class GameDataService {
  // public data = {
  //   world: this.getActiveWorlds(),
  //   activeWorld: new BehaviorSubject(null)
  // };

  constructor(private http: HttpClient) {}

  getActiveWorlds() {
    return this.http.get<WorldData[]>(`${environment.server.api}world`);
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
