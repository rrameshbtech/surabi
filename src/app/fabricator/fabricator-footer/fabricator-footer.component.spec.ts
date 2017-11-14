import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricatorFooterComponent } from './fabricator-footer.component';

describe('FabricatorFooterComponent', () => {
  let component: FabricatorFooterComponent;
  let fixture: ComponentFixture<FabricatorFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricatorFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricatorFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
