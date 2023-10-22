import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorSessionCourseDetailComponent } from './professor-session-course-detail.component';

describe('ProfessorSessionCourseDetailComponent', () => {
  let component: ProfessorSessionCourseDetailComponent;
  let fixture: ComponentFixture<ProfessorSessionCourseDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorSessionCourseDetailComponent]
    });
    fixture = TestBed.createComponent(ProfessorSessionCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
