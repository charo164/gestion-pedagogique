import { Injectable } from '@angular/core';
import { ResApiService } from './res-api.service';
import { HttpClient } from '@angular/common/http';

export interface ScheduledCourse {
  id: number;
  total_hours: number;
  scheduled_hours: number;
  type: 'offline' | 'online';
  module: string;
  user: string;
  classe: string;
  school_year: string;
}

@Injectable({
  providedIn: 'root',
})
export class ScheduledCourseService extends ResApiService<ScheduledCourse> {
  constructor(http: HttpClient) {
    super(http, 'scheduled-courses');
  }
}
