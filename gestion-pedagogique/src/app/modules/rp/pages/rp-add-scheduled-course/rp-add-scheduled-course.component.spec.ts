import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpAddScheduledCourseComponent } from './rp-add-scheduled-course.component';

describe('RpAddScheduledCourseComponent', () => {
  let component: RpAddScheduledCourseComponent;
  let fixture: ComponentFixture<RpAddScheduledCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RpAddScheduledCourseComponent]
    });
    fixture = TestBed.createComponent(RpAddScheduledCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
