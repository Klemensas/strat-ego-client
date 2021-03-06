import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AuthModuleState, getAuthState } from '../reducers';
import { AuthState } from '../auth.reducer';
import { Register } from '../auth.actions';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('registerForm') public form: NgForm;
  public userSubscription: Subscription;

  constructor(private store: Store<AuthModuleState>, private router: Router) {
  }

  public ngOnInit() {
    this.userSubscription = this.store.select(getAuthState).subscribe((auth: AuthState) => {
      if (auth.user) {
        this.router.navigate(['/']);
        return;
      }
      if (auth.error) {
        if (auth.error.status === 422) {
          const errBody = auth.error.error;
          const errorMessage = errBody.message || 'Could not register user';
          this.form.form.setErrors({ errorMessage });
          return;
        }
        this.form.form.setErrors({ errorMessage: 'Unforseen server error.'});
      }

    });
  }

  public ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  public onSubmit(form) {
    this.store.dispatch(new Register(form.value));
  }
}
