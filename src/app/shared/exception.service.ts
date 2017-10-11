import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ExceptionService {

  constructor(private snackBar: MatSnackBar) { }

  handleBadResponse: (err: HttpErrorResponse) => Observable<any> = (err: HttpErrorResponse) => {

    let emsg = '';

    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      emsg = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      emsg = `Backend returned code ${err.status}, body was: ${err.error}`;
    }

    // const emsg = err
    //   ? err.error ? err.error : JSON.stringify(err)
    //   : err.statusText || 'unknown error';

    this.snackBar.open(`Error - Bad Response - ${emsg}`, 'OK', {duration: 3000});
    // return Observable.throw(emsg); // TODO: We should NOT swallow error here.
    return Observable.of(false);
  }

}
