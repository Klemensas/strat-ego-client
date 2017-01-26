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
        const foundWorld = worlds.find(w => w.config.name.toLowerCase() === target);
        if (foundWorld) {
          this.gameData.data.activeWorld.next(foundWorld);
          return foundWorld;
        }
        this.router.navigate(['/']);
        return false;
      });
  }
}