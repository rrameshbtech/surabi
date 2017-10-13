import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/subscription';

import { User } from '../../models/user.model';
import { UserDataSource } from './user-data-source.model';
import { UserService } from '../services/user.service';
import { ToastService } from '../../shared/toast.service';
import { CommonDialogService } from '../../shared/common-dialog.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { UserFilterComponent } from './user-filter.component';

@Component({
  selector: 'srb-users-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy  {

  userTableColumns:string[] = [];
  bigScreenColumns = ['actions', 'userName', 'firstName', 'lastName', 'email', 'phoneNumber', 'isActive'];
  smallScreenColumns = ['actions', 'userName'];
  
  userDataSource: UserDataSource | null;
  mode = 'Create';
  mediaWatcher: Subscription;

  saveUserSubscriber: any;
  loadUsersSubscriber: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(UserFilterComponent) userFilter: UserFilterComponent;
  user: User;

  constructor(private http: HttpClient
    , private userService: UserService
    , private toaster: ToastService
    , private commonDialog: CommonDialogService
    , private media: ObservableMedia) {
    this.user = new User();
    this.user.isActive = true;
  }

  ngOnInit() {
    this.userDataSource = new UserDataSource(
      this.userService!,
      this.userFilter,
      this.sort,
      this.paginator);

    this.mediaWatcher = this.media.subscribe((change: MediaChange) => {
      if(change.mqAlias == 'xs' || change.mqAlias == 'sm'){
        this.userTableColumns = this.smallScreenColumns;
      } else{
        this.userTableColumns = this.bigScreenColumns;
        if (this.mode == 'View') {
          this.user = new User();
          this.mode = 'Create';
        }
      }
    });
  }

  ngOnDestroy() {
    this.mediaWatcher.unsubscribe();
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

  public viewUser(userToEdit: User): void {
    this.user = Object.assign({}, userToEdit);
    this.mode = 'View';
  }

  public deleteUser(userToDelete: User): void {

    this.commonDialog.confirm(`Delete`, `Are you sure to delete user "${userToDelete.userName}"`)
      .afterClosed()
      .subscribe((confirmResult) => {
        if (confirmResult) {
          this.userService.deleteUser(userToDelete)
            .subscribe(() => {
              this.toaster.show(`User "${userToDelete.userName}" deleted successfully.`);
            });
        }
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
