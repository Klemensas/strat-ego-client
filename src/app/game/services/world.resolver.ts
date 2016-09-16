import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { GameDataService } from '../../services/game-data.service';


@Injectable()
export class WorldResolver implements Resolve<any> {
  constructor (private router: Router, private gameData: GameDataService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Object> {
    const target = route.params['name'].toLowerCase();

    return this.gameData.data.world
      .map(worlds => {
        const foundWorld = worlds.find(w => w.name.toLowerCase() === target);
        if (foundWorld) {
          return foundWorld;
        }
        this.router.navigate(['/']);
        return false;
      });
  }
}