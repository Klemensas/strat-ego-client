import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { SocketService } from './socket.service';
import { StoreState } from '../../store';
import { getUserState } from 'app/store/auth/auth.selectors';
import { PlayerActions } from 'app/store/player/player.actions';

@Injectable()
export class SocketGuard implements CanActivate {
  constructor(private store: Store<StoreState>, private socket: SocketService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    console.log('socket guard');
    return this.store.select(getUserState)
      .filter(({ inProgress }) => !inProgress)
      .switchMap(({ token }) => {
        console.log('ho socket');
        if (!token) { return Observable.of(false); }
        this.store.dispatch({ type: PlayerActions.SET_PROGRESS })
        return this.socket.connect(token).map(() => true);
      })
  }
}

