import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyModule } from 'angular2-busy';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { HttpClientModule } from '@angular/common/http';


import { HeaderComponent } from '@app/shared/header/header.component';
import { FooterComponent } from '@app/shared/footer/footer.component';
import { AuthService } from '@app/core/auth/auth.service';
import { ToastService } from '@app/shared/toast.service';
import { ExceptionService } from '@app/core/exception.service';
import { ResetPasswordComponent } from './reset-password.component';
import { UserService } from '../services/user.service';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BusyModule,
        RouterTestingModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        HttpClientModule
      ],
      declarations: [ 
        ResetPasswordComponent,
        HeaderComponent,
        FooterComponent
      ],
      providers: [
        AuthService,
        ToastService,
        ExceptionService,
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
