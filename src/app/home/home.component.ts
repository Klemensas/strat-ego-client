import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Logout } from '../auth/auth.actions';
import { getUser, AuthModuleState } from '../auth/reducers';
import { getWorlds, getWorldError } from '../reducers';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public worlds;
  public user;
  public userSubscription$: Subscription;
  public worlds$ = this.store.select(getWorlds);
  public worldError$ = this.store.select(getWorldError).pipe(
    filter((error) => !!error),
    map((error) => 'Could not connect to the server.')
  );
  public userSubScription: Subscription;
  public isCollapsed = true;

  constructor(private authService: AuthService, private store: Store<AuthModuleState>) {}

  ngOnInit() {
    this.userSubscription$ = this.store.select(getUser).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }

  userOnWorld(world) {
      return this.user.UserWorlds.find(w => w.id === world.id);
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
