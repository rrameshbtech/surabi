import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  defaultRedirectUrl:string = './users/home';
  userId: string = '';
  password: string = '';

  constructor(private userService: UserService,
    private router:Router) { }

  ngOnInit() {
  }

  signIn(): void {
    this.userService.signIn(this.userId, this.password)
      .subscribe((signInResponse) => {
        if (signInResponse.isAuthenticated) {
          this.router.navigate([this.defaultRedirectUrl]);
        } else {
          console.log('User credentials are invalid.');
        }
      });
  }

}
