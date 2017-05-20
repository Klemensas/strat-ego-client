import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit(form) {
    this.authService.login(form.value).subscribe(
      u => this.router.navigate(['/']),
      err => {
        if (err.status === 401) {
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
