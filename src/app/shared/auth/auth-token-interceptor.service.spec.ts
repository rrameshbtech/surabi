import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpRequest } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';

import { AuthTokenInterceptor } from './auth-token-interceptor.service';
import { AuthService } from './auth.service';
import { ToastService } from '../toast.service';
import { ExceptionService } from '../exception.service';

describe('AuthTokenInterceptor', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        MaterialModule
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
        AuthService,
        ToastService,
        ExceptionService
      ]
    });
  });

  it('should attach token in header for the request', inject([HttpClient, HttpTestingController, AuthService], 
    (http: HttpClient, mock: HttpTestingController, auth: AuthService) => {
      auth.token = 'test-token';
      http.get('test/api').subscribe((res) => {
        expect(res).toBeTruthy();
      });

      mock
        .expectOne((req: HttpRequest<any>) => {
          return req.headers.get('Authorization') 
          && req.headers.get('Authorization') === 'Bearer test-token';
        })
        .flush({});

      mock.verify();
    }));

});