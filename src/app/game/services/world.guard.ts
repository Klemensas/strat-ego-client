import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import { Store } from '@ngrx/store';

import { StoreState } from '../../store';
import { WorldActions, getWorld } from '../../store/world';
import { getPlayerState } from '../../store/player';

@Injectable()
export class WorldGuard implements CanActivate {
  constructor(private store: Store<StoreState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    console.log('world guard');
    const target = route.params['name'].toLowerCase();

    return this.store.select(getWorld(target))
      .combineLatest(this.store.select(getPlayerState))
      .filter(([world, player]) => !player.inProgress)
      .map(([world, player]) => {
        console.log('guard da world', world, player)
        if (!world) {
          this.router.navigate(['/']);
          return false;
        }
        this.store.dispatch({ type: WorldActions.SELECT_WORLD, payload: world.world.name });
        return true;
      });
  }
}
