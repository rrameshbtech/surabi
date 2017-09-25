import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isNewUser:boolean = true;
  user: any = {};
  title: string = 'Users';
  constructor() { }

  ngOnInit() {
  }

  // isNewUser(): boolean {
  //   return !this.user.id;
  // }

}
