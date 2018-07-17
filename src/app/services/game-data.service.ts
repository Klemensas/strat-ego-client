import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorldData } from 'strat-ego-common';

import { environment } from '../../environments/environment';

@Injectable()
export class GameDataService {
  constructor(private http: HttpClient) {}

  getActiveWorlds() {
    return this.http.get<WorldData[]>(`${environment.server.api}world`);
  }
}
