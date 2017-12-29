import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';

import { AuthService } from '@app/core/auth/auth.service';
import { ToastService } from '../../shared/toast.service';
import { ExceptionService } from '@app/core/exception.service';

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
