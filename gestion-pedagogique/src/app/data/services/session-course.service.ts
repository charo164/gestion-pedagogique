import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResApiService } from './res-api.service';
import { ScheduledCourse } from './scheduled-course.service';

export interface SessionCourse {
  id: number;
  start_date: string;
  end_date: string;
  canceled: number;
  scheduled_course: ScheduledCourse;
  classroom: string;
  school_year: string;
}

@Injectable({
  providedIn: 'root',
})
export class SessionCourseService extends ResApiService<SessionCourse> {
  constructor(http: HttpClient) {
    super(http, 'session-courses');
  }
}
