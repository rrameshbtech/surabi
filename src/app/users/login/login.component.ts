import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'srb-users-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  signInSubscriber: any;
  defaultRedirectUrl = './users/home';
  userId = '';
  password = '';

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  signIn(): void {
    this.signInSubscriber = this.userService.signIn(this.userId, this.password)
      .subscribe((signInResponse) => {
        if (signInResponse.isAuthenticated) {
          this.router.navigate([this.defaultRedirectUrl]);
        } else {
          console.log('User credentials are invalid.');
        }
      });
  }

}
