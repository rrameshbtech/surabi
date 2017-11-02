import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatIconModule
} from '@angular/material';

import { ConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
  imports: [
    MatIconModule,
    BrowserAnimationsModule],
  declarations: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent]
})
class TestModule { }

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        MatDialogModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    let dialogRef = dialog.open(ConfirmDialogComponent);
    component = dialogRef.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
