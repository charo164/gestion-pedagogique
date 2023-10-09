import { TestBed } from '@angular/core/testing';

import { SessionCourseService } from './session-course.service';

describe('SessionCourseService', () => {
  let service: SessionCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
