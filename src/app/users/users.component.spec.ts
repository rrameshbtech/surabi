import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';

import { AuthService } from '../shared/auth/auth.service';
import { ExceptionService } from '@app/core/exception.service';
import { ToastService } from '../shared/toast.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule, HttpClientModule],
      declarations: [ UsersComponent, HeaderComponent, FooterComponent ],
      providers: [ AuthService, ExceptionService, ToastService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should container secured header', () => {
    expect(fixture.nativeElement.querySelector('srb-secured-header')).toBeTruthy();
  });

  it('should container secured footer', () => {
    expect(fixture.nativeElement.querySelector('srb-secured-footer')).toBeTruthy();
  });
});
