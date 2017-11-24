import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// import { AuthActions, AuthState, getUserState } from './store/auth';
import { StoreState } from './store';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<StoreState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const b: Promise<boolean> = new Promise((resolve) => setTimeout(() => resolve(true), 5000));
    // return this.store.select(getUserState)
    //   .filter(({ inProgress }) => !inProgress)
    //   .map((d) => ({ lol: 'wut' }))
    //   .subscribe(d => console.log('hmm', d));
    return b;

  //   return this.store.select(getUserState)
  //     .filter(({ inProgress }) => !inProgress)
  //     .map(({ user, token }) => {
  //       console.log('hrllo', user, token)
  //       const canAccess = !!user && !!token;
  //       if (canAccess && (!route.data.role || route.data.role === user.role)) {
  //         return true;
  //       }
  //       this.router.navigate(['login']);
  //       return false;
  //     });
  }
}
