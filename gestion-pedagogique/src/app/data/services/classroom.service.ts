import { Injectable } from '@angular/core';
import { ResApiService } from './res-api.service';
import { HttpClient } from '@angular/common/http';

export interface Classroom {
  id: number;
  name: string;
  capacity: number;
}

@Injectable({
  providedIn: 'root',
})
export class ClassroomService extends ResApiService<Classroom> {
  constructor(http: HttpClient) {
    super(http, 'classrooms');
  }
}
