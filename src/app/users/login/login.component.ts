import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {

  userId:string;
  password:string;

  constructor(private userService:UserService) { }

  ngOnInit() {
  }

  signIn():void{
    this.userService.signIn(this.userId, this.password)
    .subscribe((signInResponse) => {
      console.log(signInResponse);
    });
  }

}
