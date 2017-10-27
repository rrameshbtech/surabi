import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(
    private router: Router,
    private auth: AuthService) {

  }

  canActivate():any {
    
    if(this.auth.isAuthendicated()) {
      return true;
    }

    if(this.auth.token){
      return this.auth
        .refreshSession()
        .map((session) =>{
          return true;
        });
    } else {
      this.router.navigate(['login']);
      return false;
    }

  }

}