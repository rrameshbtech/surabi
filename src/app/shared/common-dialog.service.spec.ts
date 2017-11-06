import { TestBed, inject } from '@angular/core/testing';

import { MaterialModule } from '../material.module';
import { CommonDialogService } from './common-dialog.service';

describe('CommonDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [CommonDialogService]
    });
  });

  it('should be created', inject([CommonDialogService], (service: CommonDialogService) => {
    expect(service).toBeTruthy();
  }));
});
