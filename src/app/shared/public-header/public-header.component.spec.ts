import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

import { PublicHeaderComponent } from './public-header.component';
import { environment } from '../../../environments/environment';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('PublicHeaderComponent', () => {
  let component: PublicHeaderComponent;
  let fixture: ComponentFixture<PublicHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatIconModule, 
        RouterTestingModule.withRoutes([
        
      ])],
      declarations: [ PublicHeaderComponent ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should say "Login Here" in menu button', fakeAsync(() => {
    let menuButton = fixture.nativeElement.querySelector('[mat-button]:last-child');
    
    fixture.detectChanges();
    expect(menuButton.textContent).toContain('Login Here');
  }));

});
