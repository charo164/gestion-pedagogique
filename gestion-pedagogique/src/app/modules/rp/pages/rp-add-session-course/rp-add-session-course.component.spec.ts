import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpAddSessionCourseComponent } from './rp-add-session-course.component';

describe('RpAddSessionCourseComponent', () => {
  let component: RpAddSessionCourseComponent;
  let fixture: ComponentFixture<RpAddSessionCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RpAddSessionCourseComponent]
    });
    fixture = TestBed.createComponent(RpAddSessionCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
