import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import { Store } from '@ngrx/store';

import { of, Observable } from 'rxjs';
import { filter, map, combineLatest, take, first } from 'rxjs/operators';

import { SocketService } from './game/services';
import { getAuthState } from './auth/reducers';
import { SelectWorld } from './world/world.actions';
import { State, getWorldState } from './reducers';

@Injectable()
export class FullGuard implements CanActivate {
  constructor(private store: Store<State>, private router: Router, private socket: SocketService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const target = route.params['name'].toLowerCase();

    return this.store.select(getAuthState).pipe(
      combineLatest(this.store.select(getWorldState)),
      filter(([userState, worldState]) => {
        if (userState.inProgress || worldState.inProgress) { return false; }

        return !(!userState.user && userState.token);
      }),
      first(),
      map(([userState, worldState]) => {
        const canAccess = !!userState.user && !!userState.token;
        if (!canAccess || route.data.role && route.data.role !== userState.user.role) {
          this.router.navigate(['login']);
          return false;
        }

        const world = worldState.worlds.find((item) => item.world.name.toLowerCase() === target);
        if (!world) {
          this.router.navigate(['/']);
          return false;
        }
        this.socket.connect(userState.token);
        this.store.dispatch(new SelectWorld(world.world.name));
        return true;
     })
    );
  }
}
