import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.authService.token) {
      if (!route.data['role']) {
        return true;
      } else if (route.data['role'] === this.authService.tokenData.role) {
        return true;
      }
      return false;
    }
    console.error('Unauthenticated');
    this.router.navigate(['login']);
    return false;
  }
}