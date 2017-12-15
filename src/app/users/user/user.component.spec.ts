import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyModule } from 'angular2-busy';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { AuthService } from '@app/core/auth/auth.service';
import { ToastService } from '../../shared/toast.service';
import { ExceptionService } from '@app/core/exception.service';
import { CommonDialogService } from '../../shared/common-dialog.service';
import { UserService } from '../services/user.service';
import { UserFilterComponent } from './user-filter.component';
import { UserViewDialogComponent } from './user-view-dialog.component';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BusyModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        HttpClientModule
      ],
      declarations: [ 
        UserComponent,
        UserViewDialogComponent,
        UserFilterComponent ],
      providers: [
        ObservableMedia,
        AuthService,
        ToastService,
        ExceptionService,
        UserService,
        CommonDialogService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
