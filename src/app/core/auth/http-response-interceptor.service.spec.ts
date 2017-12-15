import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpRequest } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';

import { HttpResponseInterceptor } from './http-response-interceptor.service';

describe('HttpResponseInterceptor', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true }
      ]
    });
  });

  it('should return for valid response', inject([HttpClient, HttpTestingController, Router], 
    (http: HttpClient, mock: HttpTestingController, router: Router) => {
      
      http.get('test/api').subscribe((res) => {
        expect(res).toBeTruthy();
      });

      mock
        .expectOne('test/api')
        .flush({});

      mock.verify();
    }));

  it('should redirect to login page for 401 response', inject([HttpClient, HttpTestingController, Router], 
    (http: HttpClient, mock: HttpTestingController, router: Router) => {
      spyOn(router, 'navigate');

      http.get('test/api').subscribe((res) => {},
      (error) => {
        expect(error.status).toEqual(401);
        expect(router.navigate).toHaveBeenCalledWith(['users/login']);
      });

      mock
        .expectOne('test/api')
        .flush({},{status:401, statusText: 'Unauthorized Exception'});

      mock.verify();
    }));

  it('should rethrow error for non 401 error response', inject([HttpClient, HttpTestingController, Router], 
    (http: HttpClient, mock: HttpTestingController, router: Router) => {
      spyOn(router, 'navigate');

      http.get('test/api').subscribe((res) => {},
      (error) => {
        expect(error.status).toEqual(404);
        expect(router.navigate).toHaveBeenCalledTimes(0);
      });

      mock
        .expectOne('test/api')
        .flush({},{status:404, statusText: 'Not Found'});

      mock.verify();
    }));
});