import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/data/schemas/User';
import { environment } from '@env/environment';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: User | null = null;
  public authChecking = true;

  constructor(private http: HttpClient) {}

  login({ email, password }: { email: string; password: string }) {
    return this.http
      .post(`${environment.api}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((response: any) => {
          localStorage.setItem('token', response.data.token);
          this.user = response.data.user;
          return response.data.user;
        })
      );
  }

  getLoggedUser() {
    return this.http.get(`${environment.api}/auth/me`).pipe(
      map((response: any) => {
        this.user = response.data;
        this.authChecking = false;
        return response.data;
      }),
      catchError(() => {
        this.authChecking = false;
        return of(null);
      })
    );
  }

  logout() {
    return this.http.post(`${environment.api}/auth/logout`, {}).pipe(
      map((response: any) => {
        this.user = null;
        return response.data;
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
