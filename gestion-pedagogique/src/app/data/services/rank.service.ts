import { Injectable } from '@angular/core';
import { ResApiService } from './res-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RankService extends ResApiService<any> {
  constructor(http: HttpClient) {
    super(http, 'ranks');
  }
}
