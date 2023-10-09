import { Injectable } from '@angular/core';
import { ResApiService } from './res-api.service';
import { User } from '../schemas/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ResApiService<User> {
  constructor(http: HttpClient) {
    super(http, 'users');
  }
}
