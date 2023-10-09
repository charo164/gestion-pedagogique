import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpTeacherComponent } from './rp-teacher.component';

describe('RpTeacherComponent', () => {
  let component: RpTeacherComponent;
  let fixture: ComponentFixture<RpTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RpTeacherComponent]
    });
    fixture = TestBed.createComponent(RpTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
