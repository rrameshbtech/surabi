import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import { User } from '../../models/user.model';
import { SearchResult } from '../../models/search-result.model';
import { ExceptionService } from '../../shared/exception.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  baseAPI = '';

  constructor(private http: HttpClient
    , private exceptionService: ExceptionService) {
    this.baseAPI = environment.usersAPI;
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
      .get<SearchResult<User>>(this.baseAPI, { params: queryParams })
      .catch(this.exceptionService.handleBadResponse);
  }

  getUser(id: string): Observable<User> {
    return this.http
      .get<User>(this.baseAPI + id)
      .catch(this.exceptionService.handleBadResponse);
  }

  addUser(user: User): Observable<User> {
    const body = user;
    return this.http
      .post<User>(this.baseAPI, body)
      .catch(this.exceptionService.handleBadResponse)
      .finally(() => {
        this.dataChange.next([]);
      });
  }

  updateUser(user: User): Observable<User> {
    return this.http
      .put<User>(this.baseAPI + user._id, user)
      .catch(this.exceptionService.handleBadResponse)
      .finally(() => {
        this.dataChange.next([]);
      });
  }

  deleteUser(user: User): Observable<any> {
    return this.http
      .delete(this.baseAPI + user._id)
      .catch(this.exceptionService.handleBadResponse)
      .finally(() => {
        this.dataChange.next([]);
      });;
  }

  //Todo: move to separate service
  signIn(userName: string, password: string): Observable<any> {
    const body = {
      userName: userName,
      password: password
    };

    return this.http.post(this.baseAPI + 'sessions', body)
      .map((response: any) => response.json());
  }
}
