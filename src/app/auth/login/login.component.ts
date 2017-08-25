import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { StoreState } from '../../store';
import { AuthActions, AuthState, getUserState } from '../../store/auth';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('loginForm') public form: NgForm;
  public userSubscription: Subscription;

  constructor(private router: Router, private store: Store<StoreState>) {
  }

  public ngOnInit() {
    this.userSubscription = this.store.select(getUserState).subscribe((auth: AuthState) => {
      if (auth.user) {
         this.router.navigate(['/']);
         return;
      }
      if (auth.error) {
        if (auth.error.status === 401) {
          const errBody = auth.error.json();
          const errorMessage = errBody.message;
          this.form.form.setErrors({ errorMessage });
          return;
        }
        this.form.form.setErrors({ errorMessage: 'Unforseen server error.'})
      }
    });
  }

  public ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onSubmit(form) {
    this.store.dispatch({ type: AuthActions.LOGIN, payload: form.value });
  }

}
