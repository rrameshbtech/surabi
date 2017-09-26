import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any = {};
  title: string = 'Users';
  constructor() { }

  ngOnInit() {
  }

  public isNewUser(): boolean {
    return !this.user.id;
  }

  /**
   * save current user information
   */
  public saveUser():void {
    
  }

  isValidUserForm():boolean{
    return true;
  }

  /**
   * reset current user form and clear the current information
   */
  public resetUser():void {
    
  }
}
