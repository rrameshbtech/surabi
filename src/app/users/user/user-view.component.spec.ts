import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatIconModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';

import { UserViewComponent } from './user-view.component';

@NgModule({
  imports: [
    MatIconModule,
    BrowserAnimationsModule,
    MatDialogModule],
  declarations: [UserViewComponent],
  entryComponents: [UserViewComponent],
  exports: [UserViewComponent]
})
class TestModule { }


describe('UserViewComponent', () => {
  let component: UserViewComponent;
  let dialog: MatDialog;
  let dialogRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    dialogRef = dialog.open(UserViewComponent);
    component = dialogRef.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    dialogRef = null;
  });
});
