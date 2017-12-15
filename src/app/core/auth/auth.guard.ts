import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.auth.isAuthendicated()) {
      return true;
    }

    if (this.auth.token) {
      return this.auth
        .refreshSession()
        .map((session) => {
          return true;
        });
    } else {
      this.router.navigate(['users/login'], { queryParams: { 'redirectTo': state.url } });
      return false;
    }
  }
}
