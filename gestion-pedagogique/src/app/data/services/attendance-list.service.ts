import { Injectable } from '@angular/core';
import { ResApiService } from './res-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AttendanceListService extends ResApiService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'attendance-list');
  }
}
