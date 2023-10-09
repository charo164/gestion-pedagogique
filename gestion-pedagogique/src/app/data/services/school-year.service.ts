import { Injectable } from '@angular/core';
import { ResApiService } from './res-api.service';
import { HttpClient } from '@angular/common/http';

export interface SchoolYear {
  id: string;
  status: boolean;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SchoolYearService extends ResApiService<SchoolYear> {
  constructor(http: HttpClient) {
    super(http, 'school-years');
  }
}
