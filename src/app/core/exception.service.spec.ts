import { TestBed, inject, async } from '@angular/core/testing';

import { HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { ToastService } from './toast.service';
import { ExceptionService } from './exception.service';

describe('ExceptionService', () => {
  let toaster;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [
        ExceptionService,
        ToastService
      ]
    });

    toaster = TestBed.get(ToastService);
  });

  it('should be created', inject([ExceptionService], (service: ExceptionService) => {
    expect(service).toBeTruthy();
  }));

  it('should return observable false for 401 error', inject([ExceptionService], (service: ExceptionService) => {
    let testError: HttpErrorResponse = new HttpErrorResponse({ status: 401 });

    service.handleBadResponse(testError).subscribe((error) => {
      expect(error).toBe(false);
    });
  }));

  it('should show toaster for non unauthorized errors.', async(inject([ExceptionService], (service: ExceptionService) => {
    spyOn(toaster, 'error');

    let testError: HttpErrorResponse = new HttpErrorResponse({
      status: 404,
      url: 'http://test-url',
      error: new HttpErrorResponse({ status: 500, url: 'http://test-url', statusText: 'inner-error-message' })
    });

    service.handleBadResponse(testError).subscribe((data) => {
      expect(true).toBeFalsy();
    }, (error) => {
      expect(error).toBeTruthy();
      expect(toaster.error).toHaveBeenCalledWith('Error - Bad Response - An error occurred: Http failure response for http://test-url: 500 inner-error-message');
    });
  })));

  it('should show toaster for non unauthorized errors with string message.', async(inject([ExceptionService], (service: ExceptionService) => {
    spyOn(toaster, 'error');

    let testError: HttpErrorResponse = new HttpErrorResponse({
      status: 404,
      error: 'inner-error-message'
    }
    );

    service.handleBadResponse(testError).subscribe((data) => {
      expect(true).toBeFalsy();
    }, (error) => {
      expect(error).toBeTruthy();
      expect(toaster.error).toHaveBeenCalledWith('Error - Bad Response - Backend returned code 404, body was: inner-error-message');
    });
  })));
});
