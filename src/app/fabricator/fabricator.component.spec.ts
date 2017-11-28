import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricatorComponent } from './fabricator.component';

describe('FabricatorComponent', () => {
  let component: FabricatorComponent;
  let fixture: ComponentFixture<FabricatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
