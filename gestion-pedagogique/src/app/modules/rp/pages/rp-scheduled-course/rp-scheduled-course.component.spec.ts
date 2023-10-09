import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpScheduledCourseComponent } from './rp-scheduled-course.component';

describe('RpScheduledCourseComponent', () => {
  let component: RpScheduledCourseComponent;
  let fixture: ComponentFixture<RpScheduledCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RpScheduledCourseComponent]
    });
    fixture = TestBed.createComponent(RpScheduledCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
