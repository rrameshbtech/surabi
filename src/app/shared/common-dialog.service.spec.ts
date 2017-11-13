import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { Component, Inject, NgModule } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogRef } from '@angular/material';

import { MaterialModule } from '../material.module';
import { CommonDialogService } from './common-dialog.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

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

  beforeEach(async () => {
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
    }).compileComponents();
  });

  it('should be created', inject([CommonDialogService], (dialogService: CommonDialogService) => {
    expect(dialogService).toBeTruthy();
  }));

  it('should remove scroll on opening the dialog', async(
    inject([CommonDialogService, MatDialog], (dialogService: CommonDialogService, dialog: MatDialog) => {

      expect(document.body.classList.contains('no-scroll')).toBe(false);
      let dialogRef = dialogService.openCustom(TestDialogComponent, {}, {});

      expect(document.body.classList.contains('no-scroll')).toBe(true);
    })
  ));

  it('should open confirm dialog.', async(
    inject([CommonDialogService, MatDialog], (dialogService: CommonDialogService, dialog: MatDialog) => {
      
      let mockOpen = spyOn(dialog, 'open');
      dialogService.confirm('test title', 'test message');

      expect(dialog.open).toHaveBeenCalled();
      expect(mockOpen.calls.mostRecent().args[0].name).toBe('ConfirmDialogComponent');
      expect(mockOpen.calls.mostRecent().args[1].data.title).toBe('test title');
      expect(mockOpen.calls.mostRecent().args[1].data.message).toBe('test message');
    })
  ));
  
  it('should open custom dialog.', async(
    inject([CommonDialogService, MatDialog], (dialogService: CommonDialogService, dialog: MatDialog) => {
      
      let mockOpen = spyOn(dialog, 'open');
      dialogService.openCustom(TestDialogComponent, {test: 'succeed'}, {disableClose: true});

      expect(dialog.open).toHaveBeenCalled();
      expect(mockOpen.calls.mostRecent().args[0].name).toBe('TestDialogComponent');
      expect(mockOpen.calls.mostRecent().args[1].data.test).toBe('succeed');
      expect(mockOpen.calls.mostRecent().args[1].disableClose).toBe(true);
    })
  ));
});
