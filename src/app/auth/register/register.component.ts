import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { StoreState } from '../../store';
import { AuthActions, AuthState, getUserState } from '../../store/auth';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('loginForm') public form: NgForm;
  public userSubscription: Subscription;

  constructor(private store: Store<StoreState>, private router: Router) {
  }

  public ngOnInit() {
    this.userSubscription = this.store.select(getUserState).subscribe((auth) => {
      if (auth.user) {
        this.router.navigate(['/']);
        return;
      }
      if (auth.error === 422) {
        const errBody = auth.error.json();
        const errorMessage = errBody.message;
        this.form.form.setErrors({ errorMessage });
        return;
      }
      this.form.form.setErrors({ errorMessage: 'Unforseen server error.'})

    });
  }

  public ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  public onSubmit(form) {
    this.store.dispatch({ type: AuthActions.REGISTER, payload: form.value });
  }
}
