import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Rx';
import { MatPaginator, MatSort } from '@angular/material';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

import { User } from '../../models/user.model';
import { UserService } from '../services/user.service';

export class UserDataSource extends DataSource<User>{

  totalUsers: number = 0;
  isLoadingUsers: boolean;

  constructor(private userService: UserService
    , private userTableSort: MatSort
    , private userTablePaginator: MatPaginator) {
    super();
  }

  connect(): Observable<User[]> {
    const userDataChangeEvents = [
      this.userService.dataChange,
      this.userTableSort.sortChange,
      this.userTablePaginator.page
    ];

    //reset page on sorting order change
    this.userTableSort.sortChange.subscribe(() => {
      this.userTablePaginator.pageIndex = 0;
    });

    return Observable.merge(...userDataChangeEvents)
      .startWith(null)
      .switchMap(() => {
        this.isLoadingUsers = true;
        return this.userService.getUsers({}
          , this.userTableSort.active
          , this.userTableSort.direction
          , this.userTablePaginator.pageIndex);
      })
      .map((users) => {
        this.isLoadingUsers = false;

        if (!users) {
          return [];
        }

        this.totalUsers = users.length;
        return users;
      });
  }

  disconnect() { }
}