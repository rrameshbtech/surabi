import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

import { Session } from '../../models/session.model';
import { AuthService } from '@app/core/auth/auth.service';
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
  redirectUrl = '/dashboard';
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

    this.showLogoutMessage();
    this.updateRedirectUrl();
    this.auth.clearSession();
  }

  updateRedirectUrl() {
    this.activatedRoute.queryParams
      .filter((param: any) => param.redirectTo)
      .subscribe((redirectToParam: any) => {
        this.redirectUrl = redirectToParam.redirectTo;
      });
  }

  showLogoutMessage() {
    this.activatedRoute.queryParams
      .filter((param: any) => param.loggedout)
      .subscribe(loggedOutParam => {
        //Todo: setTimeout used for work around to solve change detection error,
        //which may be resolved in later versions of angular.
        setTimeout(() => {
          this.toaster.show('You have been logged out successfully');
        });
      });
  }

  signIn(): void {
    this.signInSubscriber = this.auth.login(this.userName, this.password)
      .subscribe((currentSession: Session) => {
        if (currentSession && currentSession.token) {
          this.auth.session = currentSession;
          this.router.navigate(['.' + this.redirectUrl]);
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
