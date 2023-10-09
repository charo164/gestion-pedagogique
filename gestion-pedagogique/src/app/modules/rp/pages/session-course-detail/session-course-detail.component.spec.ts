import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCourseDetailComponent } from './session-course-detail.component';

describe('SessionCourseDetailComponent', () => {
  let component: SessionCourseDetailComponent;
  let fixture: ComponentFixture<SessionCourseDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionCourseDetailComponent]
    });
    fixture = TestBed.createComponent(SessionCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
