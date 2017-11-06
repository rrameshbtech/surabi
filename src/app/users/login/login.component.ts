import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

import { Session } from '../../models/session.model';
import { AuthService } from '../../shared/auth/auth.service';
import { ToastService } from '../../shared/toast.service';

export const SURABI_USER_NAME = 'surabi-user-name';

@Component({
  selector: 'srb-users-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  signInSubscriber: any;
  defaultRedirectUrl = './users';
  userName = '';
  password = '';
  rememberMe = false;

  constructor(private auth: AuthService
    , private router: Router
    , private activatedRoute: ActivatedRoute
    , private toaster: ToastService) { }

  ngOnInit() {
    const existingUserName = localStorage.getItem(SURABI_USER_NAME);
    if (existingUserName) {
      this.userName = existingUserName;
    }

    this.activatedRoute.queryParams
      .filter(param => param.loggedout)
      .subscribe(loggedOutParam => {
        this.toaster.show('You have been logged out successfully');
      });

    this.auth.clearSession();
  }

  signIn(): void {
    this.signInSubscriber = this.auth.login(this.userName, this.password)
      .subscribe((currentSession: Session) => {
        if (currentSession && currentSession.token) {
          this.auth.session = currentSession;
          this.router.navigate([this.defaultRedirectUrl]);
          if (this.rememberMe) {
            localStorage.setItem(SURABI_USER_NAME, this.userName);
          }
        } else {
          this.password = '';
          this.toaster.error('User credentials are invalid.');
        }
      }, function (err) {
        this.password = '';
      });
  }

}
