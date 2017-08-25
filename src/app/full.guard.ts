import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/combineLatest';

import { StoreState } from './store';
import { SocketService } from './game/services';
import { PlayerActions } from './store/player';
import { AuthActions, AuthState, getUserState } from './store/auth';
import { WorldActions, getWorld } from './store/world';
import { getPlayerState } from './store/player';

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
        this.store.dispatch({ type: PlayerActions.SET_PROGRESS })
        this.socket.connect(token);
        return this.worldGuard(target);
      });
  }

  public worldGuard(target) {
    return this.store.select(getWorld(target))
      .combineLatest(this.store.select(getPlayerState))
      .filter(([world, player]) => !player.inProgress)
      .map(([world, player]) => {
        if (!world) {
          this.router.navigate(['/']);
          return false;
        }
        this.store.dispatch({ type: WorldActions.SELECT_WORLD, payload: world.world.name });
        return true;
      });
  }
}
