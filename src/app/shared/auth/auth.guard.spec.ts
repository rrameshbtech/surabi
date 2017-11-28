import { TestBed, async, inject } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';
import { Observable } from 'rxjs/Rx';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ToastService } from '../toast.service';
import { ExceptionService } from '../exception.service';

describe('AuthGuard', () => {
  let mockRouterSnapshot:RouterStateSnapshot;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, 
        HttpClientTestingModule, 
        NoopAnimationsModule,
        MaterialModule
      ],
      providers: [
        AuthGuard, 
        AuthService, 
        ExceptionService, 
        ToastService
      ]
    });
    mockRouterSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
  });

  it('should be created', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should call isAuthenticated method of auth service',
    inject([Router, AuthGuard, AuthService], (router: Router, guard: AuthGuard, authService: AuthService) => {
      spyOn(router, 'navigate');
      spyOn(authService, 'isAuthendicated').and.returnValue(true);

      expect(guard.canActivate(null, mockRouterSnapshot)).toBeTruthy();
      expect(authService.isAuthendicated).toHaveBeenCalled();
    }));

  it('should redirect to login page, when session is invalid',
    inject([Router, AuthGuard, AuthService], (router: Router, guard: AuthGuard, authService: AuthService) => {
      authService.clearSession();
      spyOn(router, 'navigate');
      mockRouterSnapshot.url = 'test'
      
      expect(guard.canActivate(null, mockRouterSnapshot)).toBeFalsy();
      expect(router.navigate).toHaveBeenCalledWith(['users/login'], { queryParams: { 'redirectTo': 'test' } });
    }));

  it('should call refreshSession method of auth service when token is avaialble',
    inject([Router, AuthGuard, AuthService], (router: Router, guard: AuthGuard, authService: AuthService) => {

      authService.token = 'test-token';
      spyOn(router, 'navigate');
      spyOn(authService, 'isAuthendicated').and.returnValue(false);
      spyOn(authService, 'refreshSession').and.returnValue(Observable.of(true));

      expect(guard.canActivate(null, mockRouterSnapshot)).toBeTruthy();
      expect(authService.isAuthendicated).toHaveBeenCalled();
      expect(authService.refreshSession).toHaveBeenCalled();
    }));
});
