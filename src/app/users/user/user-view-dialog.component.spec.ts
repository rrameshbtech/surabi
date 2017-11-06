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


@Directive({ selector: 'dir-with-view-container' })
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
      providers: [{
        provide: OverlayContainer, useFactory: () => {
          overlayContainerElement = document.createElement('div');
          return { getContainerElement: () => overlayContainerElement };
        }
      }]
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([MatDialog], (d: MatDialog) => {
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

  it('should show user not found message when user details not shared.', () => {
    let dialogRef = dialog.open(UserViewDialogComponent, {
      viewContainerRef: testViewContainerRef
    });

    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.querySelector('mat-dialog-container').textContent)
      .toContain('No user details found.');
  });

  it('should show correct user details header', () => {
    let testUser = {
      userName: 'test-user-name',
      firstName: 'test-first-name',
      lastName: 'test-last-name',
      email: 'test-email',
      phoneNumber: 'test-phone-number',
      address: 'test-address'
    };
    let dialogRef = dialog.open(UserViewDialogComponent, {
      viewContainerRef: testViewContainerRef,
      data: testUser
    });

    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.querySelector('h3').textContent)
      .toContain(testUser.userName);
  });

  it('should show correct user details', () => {
    let testUser = {
      userName: 'test-user-name',
      firstName: 'test-first-name',
      lastName: 'test-last-name',
      email: 'test-email',
      phoneNumber: 'test-phone-number',
      address: 'test-address'
    };
    let dialogRef = dialog.open(UserViewDialogComponent, {
      viewContainerRef: testViewContainerRef,
      data: testUser
    });

    viewContainerFixture.detectChanges();

    let detailRows = overlayContainerElement.querySelectorAll('.fxLayout')
    for (let index = 0; index < detailRows.length; index++) {
      let detailRow = detailRows[index];
      let columnHeader = detailRow.children[0].textContent;

      columnHeader = columnHeader.replace(':', '').replace(' ', '');
      columnHeader = columnHeader[0].substr(0, 1).toLowerCase() + columnHeader[0].substr(1, columnHeader[0].length - 1);

      expect(detailRow.children[1].textContent).toContain(testUser[columnHeader]);
    }
  });

    it('should close view when close button clicked.', async(() => {
    let afterCloseCallBack = jasmine.createSpy('afterClose Callback');
    let dialogRef = dialog.open(UserViewDialogComponent, {
      viewContainerRef: testViewContainerRef
    });
    viewContainerFixture.detectChanges();

    dialogRef
      .afterClosed()
      .subscribe(afterCloseCallBack);

    let closeButton = overlayContainerElement.querySelector('button') as HTMLElement;
    closeButton.click();
    viewContainerFixture.detectChanges();
    viewContainerFixture.whenStable().then(() =>{
      expect(afterCloseCallBack).toHaveBeenCalledTimes(0);
    });
  }));

});