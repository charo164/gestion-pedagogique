import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorScheduledCourseComponent } from './professor-scheduled-course.component';

describe('ProfessorScheduledCourseComponent', () => {
  let component: ProfessorScheduledCourseComponent;
  let fixture: ComponentFixture<ProfessorScheduledCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorScheduledCourseComponent]
    });
    fixture = TestBed.createComponent(ProfessorScheduledCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
