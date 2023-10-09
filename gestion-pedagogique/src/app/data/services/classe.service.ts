import { Injectable } from '@angular/core';
import { ResApiService } from './res-api.service';
import { HttpClient } from '@angular/common/http';

export interface Classe {
  id: number;
  name: string;
  field_of_study: string;
  school_level: string;
  school_year: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClasseService extends ResApiService<Classe> {
  constructor(http: HttpClient) {
    super(http, 'classes');
  }
}
