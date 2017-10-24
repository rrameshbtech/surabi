import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Session } from '../../models/session.model';
import { AuthService } from '../../shared/auth/auth.service';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'srb-users-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  signInSubscriber: any;
  defaultRedirectUrl = './dashboard';
  userId = '';
  password = '';

  constructor(private authService: AuthService
    , private router: Router
    , private toast: ToastService) { }

  ngOnInit() {
  }

  signIn(): void {
    this.signInSubscriber = this.authService.login(this.userId, this.password)
      .subscribe((currentSession: Session) => {
        if (currentSession && currentSession.token) {
          this.authService.session = currentSession;
          this.router.navigate([this.defaultRedirectUrl]);
        } else {
          this.toast.error('User credentials are invalid.');
        }
      });
  }

}
