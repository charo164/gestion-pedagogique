import { Injectable } from '@angular/core';
import { ResApiService } from './res-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SpecializationService extends ResApiService<any> {
  constructor(http: HttpClient) {
    super(http, 'specializations');
  }
}
