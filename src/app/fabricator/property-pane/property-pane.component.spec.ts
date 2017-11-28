import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPaneComponent } from './property-pane.component';

describe('PropertyPaneComponent', () => {
  let component: PropertyPaneComponent;
  let fixture: ComponentFixture<PropertyPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
