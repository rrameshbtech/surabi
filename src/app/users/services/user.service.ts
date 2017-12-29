import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import { User } from '@app/models/user.model';
import { SearchResult } from '@app/models/search-result.model';
import { ExceptionService } from '@app/core/exception.service';
import { environment } from '@environments/environment';

@Injectable()
export class UserService {

  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  baseUrl = '';

  constructor(private http: HttpClient
    , private exceptionService: ExceptionService) {
    this.baseUrl = environment.userServiceBaseUrl + 'users/';
  }

  getUsers(query: any
    , sort: string
    , order: string
    , page: number
    , pageSize: number): Observable<SearchResult<User>> {
    let queryParams = new HttpParams();

    for (const field in query) {
      if (query.hasOwnProperty(field)) {
        queryParams = queryParams.append(field, query[field]);
      }
    }

    queryParams = queryParams.append('sort', sort)
      .set('direction', order)
      .set('page', page.toString())
      .set('pagesize', pageSize.toString());

    return this.http
      .get<SearchResult<User>>(this.baseUrl, { params: queryParams })
      .catch(this.exceptionService.handleBadResponse);
  }

  getUser(id: string): Observable<User> {
    return this.http
      .get<User>(this.baseUrl + id)
      .catch(this.exceptionService.handleBadResponse);
  }

  addUser(user: User): Observable<User> {
    const body = user;
    return this.http
      .post<User>(this.baseUrl, body)
      .catch(this.exceptionService.handleBadResponse)
      .finally(() => {
        this.dataChange.next([]);
      });
  }

  updateUser(user: User): Observable<User> {
    return this.http
      .put<User>(this.baseUrl + user._id, user)
      .catch(this.exceptionService.handleBadResponse)
      .finally(() => {
        this.dataChange.next([]);
      });
  }

  resetPassword(userId:string, currentPassword:string, newPassword:string): Observable<any> {
    const patchData = {
      currentPassword: currentPassword,
      newPassword: newPassword
    };

    return this.http
      .patch(`${this.baseUrl}${userId}/password`, patchData)
      .catch(this.exceptionService.handleBadResponse);
  }

  deleteUser(user: User): Observable<any> {
    return this.http
      .delete(this.baseUrl + user._id)
      .catch(this.exceptionService.handleBadResponse)
      .finally(() => {
        this.dataChange.next([]);
      });;
  }

}
