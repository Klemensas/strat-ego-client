import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.authService.isLoggedIn()) {
      if (!route.data['role']) {
        return true;
      }
      return this.authService.hasRole(route.data['role']);
    }
    this.router.navigate(['login']);
    return false;
  }
}