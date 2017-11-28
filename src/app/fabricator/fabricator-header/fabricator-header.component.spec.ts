import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricatorHeaderComponent } from './fabricator-header.component';

describe('FabricatorHeaderComponent', () => {
  let component: FabricatorHeaderComponent;
  let fixture: ComponentFixture<FabricatorHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricatorHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricatorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
