import { Component, OnInit } from '@angular/core';
//import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  // userIdControl:FormControl = new FormControl('', [Validators.required]);
  // passwordControl:FormControl = new FormControl('', [Validators.required]);

  signInSubscriber: any;
  defaultRedirectUrl:string = './users/home';
  userId: string = '';
  password: string = '';

  constructor(private userService: UserService,
    private router:Router) { }

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
