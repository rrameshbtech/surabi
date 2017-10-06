import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

  baseAPI = '';

  constructor(private http: Http) {
    this.baseAPI = environment.usersAPI;
  }

  signIn(userId: string, password: string): Observable<any> {
    const body = {
      userId: userId,
      password: password
    };

    return this.http.post(this.baseAPI + 'sessions', body)
      .map((response: any) => response.json());
  }
}
