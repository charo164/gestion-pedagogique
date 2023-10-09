import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpSessionCourseComponent } from './rp-session-course.component';

describe('RpSessionCourseComponent', () => {
  let component: RpSessionCourseComponent;
  let fixture: ComponentFixture<RpSessionCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RpSessionCourseComponent]
    });
    fixture = TestBed.createComponent(RpSessionCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
