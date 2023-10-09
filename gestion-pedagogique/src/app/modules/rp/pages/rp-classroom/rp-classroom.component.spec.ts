import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpClassroomComponent } from './rp-classroom.component';

describe('RpClassroomComponent', () => {
  let component: RpClassroomComponent;
  let fixture: ComponentFixture<RpClassroomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RpClassroomComponent]
    });
    fixture = TestBed.createComponent(RpClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
