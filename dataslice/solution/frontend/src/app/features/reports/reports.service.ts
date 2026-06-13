import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { Report } from './report.model';

@Injectable({ providedIn: 'root' })
export class ReportsService {
  constructor(private api: ApiService) {}

  list(): Observable<Report[]> {
    return this.api.get<Report[]>('/api/reports');
  }
  create(name: string, querySpec: Record<string, unknown>): Observable<Report> {
    return this.api.post<Report>('/api/reports', { name, query_spec: querySpec });
  }
  remove(id: number): Observable<void> {
    return this.api.delete<void>(`/api/reports/${id}`);
  }
}
