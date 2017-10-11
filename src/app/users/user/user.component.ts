import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';

import { User } from '../../models/user.model';
import { UserDataSource } from './user-data-source.model';
import { UserService } from '../services/user.service';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'srb-users-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userTableColumns = ['actions', 'userName', 'name', 'email', 'phoneNumber', 'isActive'];
  userDataSource: UserDataSource | null;
  mode = 'Create';

  saveUserSubscriber: any;
  loadUsersSubscriber: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  user: User;

  constructor(private http: HttpClient
    , private userService: UserService
    , private toaster: ToastService) {
    this.user = new User();
    this.user.isActive = true;
  }

  ngOnInit() {
    this.userDataSource = new UserDataSource(
      this.userService!,
      this.sort,
      this.paginator);

    this.user.userName = 'test_user_name';
    this.user.firstName = 'test_first_name';
    this.user.lastName = 'test_last_name';
    this.user.email = 'test_email@example.com';
    this.user.phoneNumber = '9600077796';
    this.user.address = 'test_address';
  }

  public isNewUser(): boolean {
    return !this.user._id;
  }

  /**
   * save current user information
   */
  public saveUser(userForm: any): void {

    if (!this.user._id) {
      this.saveUserSubscriber = this.userService.addUser(this.user);
    } else {
      this.saveUserSubscriber = this.userService.updateUser(this.user);
    }

    this.saveUserSubscriber.subscribe((data) => {
      this.toaster.show(`User "${this.user.userName}" saved successfully.`);
      this.resetUser(userForm);
    });
  }

  public editUser(userToEdit: User): void {
    this.user = Object.assign({}, userToEdit);
    this.mode = 'Edit';
  }

  public deleteUser(userToDelete: User): void {
    this.userService.deleteUser(userToDelete)
      .subscribe(() => {
        this.toaster.show(`User "${userToDelete.userName}" deleted successfully.`);
      });
  }

  /**
   * reset current user form and clear the current information
   */
  public resetUser(userForm: any): void {
    if (userForm) {
      userForm.resetForm({ isActiveCheck: true });
    }
    this.mode = 'Create';
  }
}
