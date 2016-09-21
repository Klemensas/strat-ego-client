import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  form;
  userModel;

    // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;

  constructor(private authService: AuthService, private router: Router) {
  }


  ngOnInit() {
    this.userModel = {
      email: new FormControl('test@test.com', Validators.required),
      password: new FormControl('default', Validators.required)
    };

    this.form = new FormGroup(this.userModel);
  }

  onSubmit(form) {
     if (form.valid) {
       this.authService.login(form.value).subscribe(
         u => this.router.navigate(['/']),
         err => console.error('login error', err)
       );
    }
  }

}
