import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, ResApiService } from './res-api.service';
import { Observable } from 'rxjs';

export interface Inscription {
  id: number;
  student: Student;
  classe: Classe;
  school_year: string;
  created_at: any;
  updated_at: any;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  matricule: string;
  birth_date: string;
  birth_place: string;
}

export interface Classe {
  id: number;
  name: string;
  field_of_study_id: number;
  school_level_id: number;
  school_year_id: number;
  created_at: string;
  updated_at: string;
}

export interface Student {
  name: string;
  email: string;
  matricule: string;
  birth_date: string;
  birth_place: string;
}

@Injectable({
  providedIn: 'root',
})
export class InscriptionService extends ResApiService<Inscription> {
  constructor(http: HttpClient) {
    super(http, 'inscriptions');
  }
}
