import { TestBed } from '@angular/core/testing';

import { ScheduledCourseService } from './scheduled-course.service';

describe('ScheduledCourseService', () => {
  let service: ScheduledCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
