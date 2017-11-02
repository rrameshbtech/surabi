import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';

import { AuthService } from '../../shared/auth/auth.service';
import { ToastService } from '../../shared/toast.service';
import { ExceptionService } from '../../shared/exception.service';

import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MaterialModule],
      providers: [
        UserService,
        AuthService,
        ToastService,
        ExceptionService
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
