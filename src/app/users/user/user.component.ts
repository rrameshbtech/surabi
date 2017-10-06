import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'srb-users-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  saveUserSubscriber: any;
  loadUsersSubscriber: any;

  user: User;

  constructor() { 
    this.user = new User();
    this.user.isActive = true;
  }

  ngOnInit() {
  }

  public isNewUser(): boolean {
    return !this.user.id;
  }

  /**
   * save current user information
   */
  public saveUser(): void {

  }

  isValidUserForm(): boolean {
    return true;
  }

  /**
   * reset current user form and clear the current information
   */
  public resetUser(): void {

  }
}
