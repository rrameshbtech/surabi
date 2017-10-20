import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Rx';

import { Session } from '../../models/session.model';
import { ExceptionService } from '../../shared/exception.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  baseUrl = '';
  constructor(private http: HttpClient, private exceptionService: ExceptionService) {
    this.baseUrl = environment.userServiceBaseUrl + 'sessions/';
  }

  
  signIn(userName: string, password: string): Observable<any> {
    const body = {
      userName: userName,
      password: password
    };

    return this.http.post<Session>(this.baseUrl, body)
      .catch(this.exceptionService.handleBadResponse);;
  }
}
