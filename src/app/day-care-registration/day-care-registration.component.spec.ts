import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayCareRegistrationComponent } from './day-care-registration.component';

describe('DayCareRegistrationComponent', () => {
  let component: DayCareRegistrationComponent;
  let fixture: ComponentFixture<DayCareRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayCareRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayCareRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
