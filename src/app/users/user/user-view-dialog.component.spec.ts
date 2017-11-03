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

import { UserViewDialogComponent } from './user-view-dialog.component';


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
    UserViewDialogComponent,
    ComponentWithChildViewContainer,
    DirectiveWithViewContainer
  ],
  exports: [
    UserViewDialogComponent,
    ComponentWithChildViewContainer,
    DirectiveWithViewContainer
  ],
  entryComponents: [
    UserViewDialogComponent,
    ComponentWithChildViewContainer
  ]
})
class UserViewDialogTestingModule { }

describe('UserViewDialogComponent', () => {

  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;
  let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;
  let testViewContainerRef: ViewContainerRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule, 
        NoopAnimationsModule,
        UserViewDialogTestingModule
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
    let dialogRef = dialog.open(UserViewDialogComponent, {
      viewContainerRef: testViewContainerRef
    });

    viewContainerFixture.detectChanges();

    expect(dialogRef.componentInstance).toBeTruthy();
  });

});