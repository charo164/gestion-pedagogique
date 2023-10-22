import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttacheSessionCourseDetailComponent } from './attache-session-course-detail.component';

describe('AttacheSessionCourseDetailComponent', () => {
  let component: AttacheSessionCourseDetailComponent;
  let fixture: ComponentFixture<AttacheSessionCourseDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttacheSessionCourseDetailComponent]
    });
    fixture = TestBed.createComponent(AttacheSessionCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
