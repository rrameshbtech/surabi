import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

  baseAPI: string = '';

  constructor(private http: Http) {
    this.baseAPI = environment.usersAPI;
  }

  signIn(userId: string, password: string): Observable<any> {
    let headers: Headers = new Headers();
    headers.append('userId', userId);
    headers.append('password', password);

    let options: any = { headers: headers };

    return this.http.post(this.baseAPI + '/session', {}, options)
      .map((response: any) => response.json());
  }
}
