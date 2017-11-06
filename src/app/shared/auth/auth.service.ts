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
      .catch(this.exceptionService.handleBadResponse);
  }

  refreshSession() {
    return this.http.get<Session>(this.baseUrl)
      .catch(this.exceptionService.handleBadResponse)
      .map((refreshedSession: Session) => this.session = refreshedSession);
  }

  clearSession() {
    this.session = null;
  }

  isAuthendicated() {
    //Todo: implement logic to validate the token
    return this.session && this.session.userId;
  }

  get token(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  set token(userToken: string) {
    if(userToken) {
      localStorage.setItem(TOKEN_NAME, userToken);
    } else {
      localStorage.removeItem(TOKEN_NAME);
    }
  }

  get session(): Session {
      return this._session;
  }

  set session(newSession: Session) {
    if(newSession){
      this._session = new Session(newSession);
      this.token = this.session.token;
    } else {
      this._session = null;
      this.token = null;
    }
  }
}
