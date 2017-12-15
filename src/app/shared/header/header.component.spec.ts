import { async, fakeAsync, tick, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatMenuModule, MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '@app/core/auth/auth.service';
import { ExceptionService } from '@app/core/exception.service';
import { ToastService } from '../toast.service';
import { HeaderComponent } from './header.component';
import { environment } from '../../../environments/environment';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService: AuthService;
  let mockRouter:Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatMenuModule,
        HttpClientModule,
        MatSnackBarModule,
        CommonModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [HeaderComponent],
      providers: [
        AuthService,
        ExceptionService,
        ToastService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockAuthService = fixture.debugElement.injector.get(AuthService);
    mockRouter = fixture.debugElement.injector.get(Router);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain application name & logo.', () => {
    let logoContainer = fixture.nativeElement.querySelector('.logo');
    expect(logoContainer.textContent).toContain('Surabi');
    expect(logoContainer.querySelector('.fa-gear')).toBeTruthy();
  });

  it('should have base url in logo', () => {
    let logoContainer = fixture.nativeElement.querySelector('.logo') as HTMLElement;

    expect(logoContainer.attributes.getNamedItem('href').value).toEqual(environment.baseUrl);
  });

  it('should contain menu for users', () => {
    expect(fixture.nativeElement.querySelector('mat-menu')).toBeTruthy();
  });

  it('should say "Hello User" in menu button', fakeAsync(() => {
    let menuButton = fixture.nativeElement.querySelector('.user-menu-button');
    mockAuthService.session = { name: 'Test User', userId: '', email: '', token: '' };

    fixture.detectChanges();
    expect(menuButton.textContent).toContain('Hello Test User');
  }));

  it('should clear session when logout is called.', () => {
    spyOn(mockAuthService, 'clearSession');
    spyOn(mockRouter, 'navigate');
    
    component.logout();
    
    expect(mockAuthService.clearSession).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/users/login'], { queryParams: { 'loggedout': true } });
  });

});
