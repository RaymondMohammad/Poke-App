import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }
}