import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyModule } from 'angular2-busy';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';


import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { AuthService } from '../../shared/auth/auth.service';
import { ToastService } from '../../shared/toast.service';
import { ExceptionService } from '../../shared/exception.service';
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
