import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

  baseAPI = '';

  constructor(private http: Http) {
    this.baseAPI = environment.usersAPI;
  }

  get(query: any): Observable<User[]> {
    let queryString = '';

    for (let field in query) {
      queryString += '${field}=${query[field]}';
    }

    return this.http.get('${this.baseAPI}?${queryString}')
      .map((response: any) => response.json());
  }

  getById(id: string): Observable<User> {
    return this.http.get(this.baseAPI + id)
      .map((response: any) => response.json());
  }

  create(user: User): Observable<User> {
    return this.http.post(this.baseAPI, user)
      .map((response: any) => response.json());
  }

  update(user: User): Observable<User> {
    return this.http.put(this.baseAPI + user._id, user)
      .map((response: any) => response.json());
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.baseAPI + id)
      .map((response: any) => response.json());
  }

  // signIn(userName: string, password: string): Observable<any> {
  //   const body = {
  //     userName: userName,
  //     password: password
  //   };

  //   return this.http.post(this.baseAPI + 'sessions', body)
  //     .map((response: any) => response.json());
  // }
}
