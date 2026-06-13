import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // Demo auth: identifies the current user to the backend. Real auth
  // would supply a token instead.
  private headers = new HttpHeaders({ 'X-User-Id': '1' });

  constructor(private http: HttpClient) {}

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${environment.apiBase}${path}`, { headers: this.headers });
  }
  post<T>(path: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${environment.apiBase}${path}`, body, { headers: this.headers });
  }
  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${environment.apiBase}${path}`, { headers: this.headers });
  }
}
