import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  signIn(): void {
    this.signInSubscriber = this.authService.signIn(this.userId, this.password)
      .subscribe((currentSession) => {
        if (currentSession._id) {
          this.router.navigate([this.defaultRedirectUrl]);
        } else {
          console.log('User credentials are invalid.');
        }
      });
  }

}
