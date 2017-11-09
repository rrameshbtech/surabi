import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'srb-secured-header',
  templateUrl: './header.component.html',
  styles: [
    ` //Header Logo
      .logo {
        padding: 5px;
      }
      .logo span {
          font-family: 'Audiowide', cursive;
          font-size: 2em;
          margin-left: 5px;
        }`
  ]
})
export class HeaderComponent implements OnInit {
  userMenu: any;
  baseUrl = '';

  constructor(public auth: AuthService
    , private router: Router
  ) {
    this.baseUrl = environment.baseUrl;
  }

  ngOnInit() {
  }

  logout() {
    this.auth.clearSession();
    this.router.navigate(['/users/login'], { queryParams: { 'loggedout': true } });
  }

}
