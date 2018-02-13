import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { filter, switchMap, map } from 'rxjs/operators';

import { SocketService } from './game/services';
import { getAuthState } from './auth/reducers';
import { SelectWorld } from './world/world.actions';
import { State, getWorlds } from './reducers';

@Injectable()
export class FullGuard implements CanActivate {
  constructor(private store: Store<State>, private router: Router, private socket: SocketService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const target = route.params['name'].toLowerCase();

    return this.store.select(getAuthState).pipe(
      filter(({ inProgress }) => !inProgress),
      switchMap(({ user, token }) => {
        const canAccess = !!user && !!token;
        if (!canAccess || route.data.role && route.data.role !== user.role) {
          this.router.navigate(['login']);
          return of(false);
        }
        // this.store.dispatch({ type: PlayerActions.SET_PROGRESS })
        return this.worldGuard(target, token);
      })
    );
  }

  public worldGuard(target, token) {
    return this.store.select(getWorlds).pipe(

      // .combineLatest(this.store.select(getPlayerState))
      // .filter(([world, player]) => !player.inProgress)
      // .map(([world, player]) => {
      map((worlds) => {
        const world = worlds.find((item) => item.world.name.toLowerCase() === target);
        if (!world) {
          this.router.navigate(['/']);
          return false;
        }
        this.store.dispatch(new SelectWorld(world.world.name));
        this.socket.connect(token);
        return true;
      })
    );
  }
}
