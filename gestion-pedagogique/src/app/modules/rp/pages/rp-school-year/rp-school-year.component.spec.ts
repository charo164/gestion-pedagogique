import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpSchoolYearComponent } from './rp-school-year.component';

describe('RpSchoolYearComponent', () => {
  let component: RpSchoolYearComponent;
  let fixture: ComponentFixture<RpSchoolYearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RpSchoolYearComponent]
    });
    fixture = TestBed.createComponent(RpSchoolYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
