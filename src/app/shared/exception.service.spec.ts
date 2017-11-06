import { TestBed, inject } from '@angular/core/testing';

import { MaterialModule } from '../material.module';
import { ToastService } from './toast.service';
import { ExceptionService } from './exception.service';

describe('ExceptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [
        ExceptionService, 
        ToastService
      ]
    });
  });

  it('should be created', inject([ExceptionService], (service: ExceptionService) => {
    expect(service).toBeTruthy();
  }));
});
