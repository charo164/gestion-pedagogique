import { Injectable } from '@angular/core';
import { ResApiService } from './res-api.service';
import { HttpClient } from '@angular/common/http';

export interface Module {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ModuleService extends ResApiService<Module> {
  constructor(http: HttpClient) {
    super(http, 'modules');
  }
}
