import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit(form) {
    this.authService.register(form.value).subscribe(
      u => this.router.navigate(['/']),
      err => {
        if (err.status === 422) {
          const errBody = err.json();
          const errorMessage = errBody.message;
          form.form.setErrors({ errorMessage });
          return;
        }
        form.form.setErrors({ errorMessage: 'Unforseen server error.'})
      }
    );
  }
}
