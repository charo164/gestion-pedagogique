import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorSessionCourseComponent } from './professor-session-course.component';

describe('ProfessorSessionCourseComponent', () => {
  let component: ProfessorSessionCourseComponent;
  let fixture: ComponentFixture<ProfessorSessionCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorSessionCourseComponent]
    });
    fixture = TestBed.createComponent(ProfessorSessionCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
