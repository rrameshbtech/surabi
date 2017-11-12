import { TestBed, inject, async } from '@angular/core/testing';
import { Component, Inject, NgModule } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../material.module';
import { CommonDialogService } from './common-dialog.service';

@Component({
  template: `<section>Test Dialog</section>`
})
export class TestDialogComponent {

}

@NgModule({
  declarations: [TestDialogComponent],
  entryComponents: [TestDialogComponent]
})
class TestModule {

}

describe('CommonDialogService', () => {
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        TestModule
      ],
      providers: [CommonDialogService,
        {
          provide: OverlayContainer,
          useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
          }
        }]
    });
  });

  it('should be created', inject([CommonDialogService], (dialogService: CommonDialogService) => {
    expect(dialogService).toBeTruthy();
  }));

  it('should remove dialog on opening the dialog', async(() => {
    inject([CommonDialogService], (dialogService: CommonDialogService) => {
      expect(document.body.classList.contains('no-scroll')).toBe(false);
      let dialogRef = dialogService.openCustom(TestDialogComponent, {}, {});

      expect(document.body.classList.contains('no-scroll')).toBe(true);

      dialogRef.close();
      expect(document.body.classList.contains('no-scroll')).toBe(false);
    })
  }));

});
