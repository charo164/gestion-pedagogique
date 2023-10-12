import { TestBed } from '@angular/core/testing';

import { AttendanceListService } from './attendance-list.service';

describe('AttendanceListService', () => {
  let service: AttendanceListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
