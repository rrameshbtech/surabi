import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  defaultRedirectUrl = './dashboard';
  userName = '';
  password = '';
  rememberMe = false;

  constructor(private authService: AuthService
    , private router: Router
    , private toast: ToastService) { }

  ngOnInit() {
    const existingUserName = localStorage.getItem(SURABI_USER_NAME);
    if (existingUserName) {
      this.userName = existingUserName;
    }
  }

  signIn(): void {
    this.signInSubscriber = this.authService.login(this.userName, this.password)
      .subscribe((currentSession: Session) => {
        if (currentSession && currentSession.token) {
          this.authService.session = currentSession;
          this.router.navigate([this.defaultRedirectUrl]);
          if (this.rememberMe) {
            localStorage.setItem(SURABI_USER_NAME, this.userName);
          }
        } else {
          this.toast.error('User credentials are invalid.');
        }
      });
  }

}
