import { 
  TestBed,
  async,
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  inject,
  tick
 } from '@angular/core/testing';
import {
  ViewContainerRef,
  NgModule,
  Component,
  Directive,
  ViewChild
} from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatIconModule
} from '@angular/material';
import { OverlayContainer } from '@angular/cdk/overlay';

import { ConfirmDialogComponent } from './confirm-dialog.component';

@Directive({selector: 'dir-with-view-container'})
class DirectiveWithViewContainer {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
  selector: 'arbitrary-component',
  template: `<dir-with-view-container></dir-with-view-container>`,
})
class ComponentWithChildViewContainer {
  @ViewChild(DirectiveWithViewContainer) childWithViewContainer: DirectiveWithViewContainer;

  get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}


@NgModule({
  imports: [
    MatIconModule,
    NoopAnimationsModule
  ],
  declarations: [
    ConfirmDialogComponent,
    ComponentWithChildViewContainer,
    DirectiveWithViewContainer
  ],
  exports: [
    ConfirmDialogComponent,
    ComponentWithChildViewContainer,
    DirectiveWithViewContainer
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ComponentWithChildViewContainer
  ]
})
class ConfirmDialogTestingModule { }

describe('ConfirmDialogComponent', () => {

  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;
  let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;
  let testViewContainerRef: ViewContainerRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule, 
        NoopAnimationsModule,
        ConfirmDialogTestingModule
      ],
      declarations: [],
      providers:[{provide: OverlayContainer, useFactory: () => {
        overlayContainerElement = document.createElement('div');
        return { getContainerElement: () => overlayContainerElement };
      }}]
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([MatDialog ], (d: MatDialog) => {
    dialog = d;
  }));

  beforeEach(() => {
    viewContainerFixture = TestBed.createComponent(ComponentWithChildViewContainer);
    viewContainerFixture.detectChanges();

    testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
  });

  it('should be created', () => {
    let dialogRef = dialog.open(ConfirmDialogComponent, {
      viewContainerRef: testViewContainerRef
    });

    viewContainerFixture.detectChanges();

    expect(dialogRef.componentInstance).toBeTruthy();
  });

  it('should show default message when confirmation message is not given.', () => {
    let dialogRef = dialog.open(ConfirmDialogComponent, {
      viewContainerRef: testViewContainerRef
    });

    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.querySelector('mat-dialog-content').textContent)
      .toContain('Are you sure to continue?');
  });

  it('should show default title when confirmation title is not given.', () => {
    let dialogRef = dialog.open(ConfirmDialogComponent, {
      viewContainerRef: testViewContainerRef
    });

    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.querySelector('h2').textContent)
      .toContain('Confirm Action');
  });

  it('should show valid message when confirmation message is given.', () => {
    let testConfirmData = {
      message: 'Are you sure to Test?'
    }
    let dialogRef = dialog.open(ConfirmDialogComponent, {
      viewContainerRef: testViewContainerRef,
      data: testConfirmData
    });

    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.querySelector('mat-dialog-content').textContent)
      .toContain(testConfirmData.message);
  });

  it('should show valid title when confirmation title is given.', () => {
    let testConfirmData = {
      title: 'Dialog Tested'
    }
    let dialogRef = dialog.open(ConfirmDialogComponent, {
      viewContainerRef: testViewContainerRef,
      data: testConfirmData
    });

    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.querySelector('h2').textContent)
      .toContain(testConfirmData.title);
  });

  it('should pass true to callback when "Yes" is clicked.', () => {
    let dialogRef = dialog.open(ConfirmDialogComponent, {
      viewContainerRef: testViewContainerRef
    });

    viewContainerFixture.detectChanges();

    let yesButton = overlayContainerElement.querySelector('button:first-child') as HTMLElement;
    yesButton.click();
    viewContainerFixture.detectChanges();    
  });

});