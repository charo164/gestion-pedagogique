import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResApiService } from './res-api.service';
import { ScheduledCourse } from './scheduled-course.service';
import { Student } from './inscription.service';

export interface SessionCourse {
  id: number;
  start_date: string;
  end_date: string;
  canceled: boolean;
  scheduled_course: ScheduledCourse;
  attendance_lists: AttendanceList[];
  classroom: string;
  school_year: string;
}

export interface AttendanceList {
  id: number;
  student: Student;
  time_in: number | null;
  time_out: number | null;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class SessionCourseService extends ResApiService<SessionCourse> {
  constructor(http: HttpClient) {
    super(http, 'session-courses');
  }
}
