import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

interface ApiPagination {
  currentPage: number;
  from: number;
  lastPage: number;
  perPage: number;
  to: number;
  total: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
  pagination?: ApiPagination;
}

export class ResApiService<T> {
  public fetching = false;
  public updating = false;
  public baseUrl: string = 'http://localhost:8000/api';
  public url = '';

  constructor(private http: HttpClient, private endpoint: string) {
    this.url = `${this.baseUrl}/${this.endpoint}`;
  }

  getAll(params?: Record<string, string | number>) {
    this.fetching = true;
    return this.http
      .get<ApiResponse<T[]>>(`${this.url}?${this.parseQuery(params)}`)
      .pipe(
        map((data) => {
          this.fetching = false;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  getOne(id: string, params?: Record<string, string | number>) {
    this.fetching = true;
    return this.http
      .get<ApiResponse<T>>(`${this.url}/${id}?${this.parseQuery(params)}`)
      .pipe(
        map((data) => {
          this.fetching = false;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  create(data: Partial<T>, params?: Record<string, string | number>) {
    this.updating = true;
    return this.http
      .post<ApiResponse<T>>(`${this.url}?${this.parseQuery(params)}`, data)
      .pipe(
        map((data) => {
          this.updating = false;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  update(
    id: string,
    data: Partial<T>,
    params?: Record<string, string | number>
  ) {
    this.updating = true;
    return this.http
      .put<ApiResponse<T>>(`${this.url}/${id}?${this.parseQuery(params)}`, data)
      .pipe(
        map((data) => {
          this.updating = false;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  delete(id: string, params?: Record<string, string | number>) {
    this.updating = true;
    return this.http
      .delete<ApiResponse<T>>(`${this.url}/${id}?${this.parseQuery(params)}`)
      .pipe(
        map((data) => {
          this.updating = false;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error(error);
    return of({ error: true, message: error.error.message });
  }

  private parseQuery(query?: Record<string, string | number>) {
    if (!query) return '';
    const params = new URLSearchParams();

    Object.keys(query).forEach((key) => {
      params.set(key, query[key].toString());
    });

    return params.toString();
  }
}
