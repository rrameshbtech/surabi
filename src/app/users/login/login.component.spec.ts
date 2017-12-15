import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyModule } from 'angular2-busy';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login.component';
import { PublicHeaderComponent } from '../../shared/public-header/public-header.component';
import { PublicFooterComponent } from '../../shared/public-footer/public-footer.component';
import { Session } from '../../models/session.model';
import { AuthService } from '@app/core/auth/auth.service';
import { ToastService } from '../../shared/toast.service';
import { ExceptionService } from '@app/core/exception.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
        LoginComponent,
        PublicHeaderComponent,
        PublicFooterComponent
      ],
      providers: [
        AuthService,
        ToastService,
        ExceptionService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
