import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { StoreState } from '../store';
import { getWorlds } from '../store/world/world.selectors';
import { getUser } from 'app/store/auth/auth.selectors';
import { AuthActions } from 'app/store/auth/auth.actions';

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
  public userSubScription: Subscription;
  public isCollapsed = true;

  constructor(private authService: AuthService, private store: Store<StoreState>) {}

  ngOnInit() {
    this.userSubscription$ = this.store.select(getUser).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }

  userOnWorld(world) {
      return this.user.UserWorlds.find(w => w._id === world._id);
  }

  logout() {
    this.authService.logout();
  }

}
