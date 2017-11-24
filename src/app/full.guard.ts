import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { StoreState } from './store';
import { SocketService } from './game/services';
import { getUserState } from 'app/store/report/report.selectors';
import { getWorld } from 'app/store/world/world.selectors';
import { WorldActions } from 'app/store/world/world.actions';

@Injectable()
export class FullGuard implements CanActivate {
  constructor(private store: Store<StoreState>, private router: Router, private socket: SocketService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const target = route.params['name'].toLowerCase();

    return this.store.select(getUserState)
      .filter(({ inProgress }) => !inProgress)
      .switchMap(({ user, token }) => {
        const canAccess = !!user && !!token;
        if (!canAccess || route.data.role && route.data.role !== user.role) {
          this.router.navigate(['login']);
          return Observable.of(false);
        }
        // this.store.dispatch({ type: PlayerActions.SET_PROGRESS })
        return this.worldGuard(target, token);
      });
    }

    public worldGuard(target, token) {
      return this.store.select(getWorld(target))
      // .combineLatest(this.store.select(getPlayerState))
      // .filter(([world, player]) => !player.inProgress)
      // .map(([world, player]) => {
        .map((world) => {
          if (!world) {
            this.router.navigate(['/']);
            return false;
          }
          this.store.dispatch({ type: WorldActions.SELECT_WORLD, payload: world.world.name });
          this.socket.connect(token);
        return true;
      });
  }
}
