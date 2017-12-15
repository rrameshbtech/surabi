import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MaterialModule } from '../../material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Rx';

import { Session } from '../../models/session.model';
import { ToastService } from '../toast.service';
import { ExceptionService } from '../exception.service';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {

  let mockHttp: HttpTestingController;
  let exceptionService: ExceptionService;
  let sessionUrl: string;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule, NoopAnimationsModule],
      providers: [AuthService, ExceptionService, ToastService]
    });

    mockHttp = TestBed.get(HttpTestingController);
    exceptionService = TestBed.get(ExceptionService);
    sessionUrl = environment.userServiceBaseUrl + 'sessions/';
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should return valid session when login is called with valid credentials.',
    inject([AuthService], (auth: AuthService) => {
      let testUserName = 'test-user',
        testPassword = 'test-password';

      auth.login(testUserName, testPassword).subscribe((session) => {
        expect(session).toBeTruthy();
      });

      let loginRequest = mockHttp.expectOne((req) => {
        if (req.url !== sessionUrl) {
          return false;
        }
        if (req.body.userName !== testUserName || req.body.password !== testPassword) {
          return false;
        }

        return true;
      });

      loginRequest.flush({});
      mockHttp.verify();
    }));

  it('should call exception service when error thrown from login.',
    inject([AuthService], (auth: AuthService) => {
      let testUserName = 'test-user',
        testPassword = 'test-password';

      exceptionService.handleBadResponse = jasmine.createSpy('Exception Handling').and.returnValue(Observable.throw({}));

      auth.login(testUserName, testPassword).subscribe((res) => {
      }, (error) => {
        expect(error).toBeTruthy();
        expect(exceptionService.handleBadResponse).toHaveBeenCalled();
      });

      let loginRequest = mockHttp.expectOne((req) => {
        if (req.url !== sessionUrl) {
          return false;
        }
        if (req.body.userName !== testUserName || req.body.password !== testPassword) {
          return false;
        }

        return true;
      });

      loginRequest.error(new ErrorEvent('TEST-ERROR'));
      mockHttp.verify();
    }));

  it('should receive error message when invalid credentials provided for login.',
    inject([AuthService], (auth: AuthService) => {
      let testUserName = 'test-user',
        testPassword = 'test-password';

      auth.login(testUserName, testPassword).subscribe((res) => {
      }, (error) => {
        expect(error.error.type).toEqual('TEST-ERROR');
      });

      let loginRequest = mockHttp.expectOne((req) => {
        if (req.url !== sessionUrl) {
          return false;
        }
        if (req.body.userName !== testUserName || req.body.password !== testPassword) {
          return false;
        }

        return true;
      });

      loginRequest.error(new ErrorEvent('TEST-ERROR'));
      mockHttp.verify();
    }));

  it('should update session property after session refreshed.',
    inject([AuthService], (auth: AuthService) => {

      auth.refreshSession().subscribe((res) => {
        expect(auth.session.name).toEqual('test-session');
      });

      let refreshRequest = mockHttp.expectOne(sessionUrl);

      refreshRequest.flush({ name: 'test-session' });
      mockHttp.verify();
    }));

  it('should receive error after session refresh failed.',
    inject([AuthService], (auth: AuthService) => {

      auth.refreshSession().subscribe((res) => { }, (err) => {
        expect(err.error.type).toEqual('REFRESH-ERROR');
      });

      let refreshRequest = mockHttp.expectOne(sessionUrl);

      refreshRequest.error(new ErrorEvent('REFRESH-ERROR'));
      mockHttp.verify();
    }));

  it('should call expection service after session refresh failed.',
    inject([AuthService], (auth: AuthService) => {

      exceptionService.handleBadResponse = jasmine.createSpy('Exception Handling').and.returnValue(Observable.throw({}));

      auth.refreshSession().subscribe((res) => { }, (err) => {
        expect(err).toBeTruthy();
        expect(exceptionService.handleBadResponse).toHaveBeenCalled();
      });

      let refreshRequest = mockHttp.expectOne(sessionUrl);

      refreshRequest.error(new ErrorEvent('REFRESH-ERROR'));
      mockHttp.verify();
    }));

  it('should clear session property when clear session called.',
    inject([AuthService], (auth: AuthService) => {
      auth.session = new Session({});
      auth.clearSession();

      expect(auth.session).toBe(null);
    }));

  it('should return true when authenticated.',
    inject([AuthService], (auth: AuthService) => {
      auth.session = new Session({ userId: 'test' });

      expect(auth.isAuthendicated()).toBeTruthy();
    }));

  it('should return false when not authenticated.',
    inject([AuthService], (auth: AuthService) => {
      auth.session = new Session({});

      expect(auth.isAuthendicated()).toBeFalsy();
    }));

  it('should get token from local storage',
    inject([AuthService], (auth: AuthService) => {
      localStorage.setItem('surabi_user_token', 'test-token');

      expect(auth.token).toEqual('test-token');
    }));

  it('should set token to local storage',
    inject([AuthService], (auth: AuthService) => {
      auth.token = 'test-token-set';
      expect(localStorage.getItem('surabi_user_token')).toEqual('test-token-set');
    }));

  it('should remove token from local storage when null assigned',
    inject([AuthService], (auth: AuthService) => {
      localStorage.setItem('surabi_user_token', 'test-token');

      expect(localStorage.getItem('surabi_user_token')).toEqual('test-token');
      auth.token = null;
      expect(localStorage.getItem('surabi_user_token')).toBeFalsy();
    }));

  it('should get session & token',
    inject([AuthService], (auth: AuthService) => {

      expect(auth.session).toBeFalsy();

      auth.session = new Session({ userId: 'test-id', token: 'test-token' });

      expect(auth.session.userId).toEqual('test-id');
      expect(auth.token).toEqual('test-token');
    }));

  it('should remove session & token from local storage when null assigned',
    inject([AuthService], (auth: AuthService) => {
      auth.session = new Session({ userId: 'test-id', token: 'test-token' });
      expect(auth.session.userId).toEqual('test-id');
      expect(auth.token).toEqual('test-token');

      auth.session = null;

      expect(auth.session).toBeFalsy();
      expect(auth.token).toBeFalsy();
    }));
});
