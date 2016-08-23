import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// import { NgSwitch, NgSwitchCase } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class HeaderComponent implements OnInit {
  isLoggedIn;
  user;

  constructor(private authService:AuthService) {
    setTimeout(() => this.isLoggedIn = true, 5000);
    this.authService.user.subscribe(
      u => {
        this.user = u;
      }
    );
  }

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }

}
