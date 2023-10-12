import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpStudentComponent } from './rp-student.component';

describe('RpStudentComponent', () => {
  let component: RpStudentComponent;
  let fixture: ComponentFixture<RpStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RpStudentComponent]
    });
    fixture = TestBed.createComponent(RpStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
