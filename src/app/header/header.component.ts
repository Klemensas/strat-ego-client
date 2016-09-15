import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'main-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit {
  user;

  constructor(private authService:AuthService) {
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
