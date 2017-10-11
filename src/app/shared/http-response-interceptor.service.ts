import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import {
    HttpRequest
  , HttpEvent
  , HttpHandler
  , HttpInterceptor
  , HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).catch(err => {
      if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
             this.router.navigate(['users/login']);
          }
          return Observable.throw(err);
        }
    });
  }

}
