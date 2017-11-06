import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Rx';
import { MatPaginator, MatSort } from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { User } from '../../models/user.model';
import { UserService } from '../services/user.service';
import { UserFilterComponent } from './user-filter.component';
import { UserFilterDetails } from './user-filter-details.model';

export class UserDataSource extends DataSource<User>{
  filterParams:UserFilterDetails = new UserFilterDetails();
  totalUsers: number = 0;

  constructor(private userService: UserService
    , private userFilter: UserFilterComponent
    , private userTableSort: MatSort
    , private userTablePaginator: MatPaginator) {
    super();
  }

  connect(): Observable<User[]> {
    const userDataChangeEvents = [
      this.userFilter.filterChange,
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
      .map((data)=>{
        if(data instanceof UserFilterDetails) {
          this.filterParams = data;
        }
        return data;
      })
      .switchMap(() => {
        return this.userService.getUsers(this.filterParams
          , this.userTableSort.active
          , this.userTableSort.direction
          , this.userTablePaginator.pageIndex
          , this.userTablePaginator.pageSize);
      })
      .map((searchResult) => {
        if (!searchResult) {
          return [];
        }

        this.totalUsers = searchResult.totalRecords;
        return searchResult.data;
      });
  }

  disconnect() { }
}