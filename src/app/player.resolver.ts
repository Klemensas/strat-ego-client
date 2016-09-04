import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { GameDataService } from './services/game-data.service';


@Injectable()
export class PlayerResolver implements Resolve<any> {
  constructor (private gameData: GameDataService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Object> {
    const target = route.params['name'];

    if (route.data['new']) {
      return this.gameData.joinWorld(target);
    }
    return this.gameData.getPlayerData(target);
  }
}