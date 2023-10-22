import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttacheSessionCourseComponent } from './attache-session-course.component';

describe('AttacheSessionCourseComponent', () => {
  let component: AttacheSessionCourseComponent;
  let fixture: ComponentFixture<AttacheSessionCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttacheSessionCourseComponent]
    });
    fixture = TestBed.createComponent(AttacheSessionCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
