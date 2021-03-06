import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/subscription';

import { User } from '@app/models/user.model';
import { UserDataSource } from './user-data-source.model';
import { UserService } from '../services/user.service';
import { ToastService } from '@app/shared/toast.service';
import { CommonDialogService } from '@app/shared/common-dialog.service';
import { ConfirmDialogComponent } from '@app/shared/confirm-dialog/confirm-dialog.component';
import { UserFilterComponent } from './user-filter.component';
import { UserViewDialogComponent } from './user-view-dialog.component';

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

  saveUserSubscription: any;
  loadUsersSubscription: any;

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
    this.userTableColumns = this.smallScreenColumns;
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
      }
    });
  }

  ngOnDestroy() {
    if(this.mediaWatcher){
      this.mediaWatcher.unsubscribe();
    }
  }

  public isNewUser(): boolean {
    return !this.user._id;
  }

  /**
   * save current user information
   */
  public saveUser(userForm: any): void {

    var saveObservable;
    if (!this.user._id) {
      saveObservable = this.userService.addUser(this.user);
    } else {
      saveObservable = this.userService.updateUser(this.user);
    }

    this.saveUserSubscription = saveObservable.subscribe((data) => {
      this.toaster.show(`User "${this.user.userName}" saved successfully.`);
      this.resetUser(userForm);
    });
  }

  public editUser(userToEdit: User): void {
    this.user = Object.assign({}, userToEdit);
    this.mode = 'Edit';
  }

  public viewUser(userToView: User): void {
    this.commonDialog.openCustom(UserViewDialogComponent, userToView, {});
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
