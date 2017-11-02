import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatMenuModule, MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../auth/auth.service';
import { ExceptionService } from '../exception.service';
import { ToastService } from '../toast.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule, 
        MatMenuModule, 
        HttpClientModule, 
        MatSnackBarModule,
        CommonModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ HeaderComponent ],
      providers: [
        //{ provide: Router, useValue: mockRouter },
        AuthService, 
        ExceptionService, 
        ToastService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
