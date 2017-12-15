import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import { ToastService } from '../shared/toast.service';

@Injectable()
export class ExceptionService {

  constructor(private toaster: ToastService) { }

  handleBadResponse: (err: HttpErrorResponse) => Observable<any> = (err: HttpErrorResponse) => {

    if(err.status === 401) {
      //Do not show error message, as it will be redirected to login by default.
      return Observable.of(false);
    }

    let emsg = '';

    if (err.error instanceof Error || err.error.message) {
      // A client-side or network error occurred. Handle it accordingly.
      emsg = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      emsg = `Backend returned code ${err.status}, body was: ${err.error}`;
    }

    this.toaster.error(`Error - Bad Response - ${emsg}`);
    return Observable.throw(err);    
  }

}
