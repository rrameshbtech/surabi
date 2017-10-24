import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Rx';

import { Session } from '../../models/session.model';
import { ExceptionService } from '../exception.service';
import { environment } from '../../../environments/environment';
export const TOKEN_NAME = 'surabi_user_token';

@Injectable()
export class AuthService {
  baseUrl = '';
  private _session: Session;

  constructor(private http: HttpClient, private exceptionService: ExceptionService) {
    this.baseUrl = environment.userServiceBaseUrl + 'sessions/';
  }

  login(userName: string, password: string): Observable<Session> {
    const body = {
      userName: userName,
      password: password
    };

    return this.http.post<Session>(this.baseUrl, body)
      .catch(this.exceptionService.handleBadResponse);;
  }

  setToken(userToken: string): void {
    localStorage.setItem(TOKEN_NAME, userToken);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  get session(): Session {
    return this._session;
  }

  set session(newSession: Session) {
    this._session = new Session(newSession);
    this.setToken(this.session.token);
  }
}
