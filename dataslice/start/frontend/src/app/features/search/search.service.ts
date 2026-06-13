import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';

export interface EventRow {
  id: number;
  occurred_at: string;
  type: string;
  source: string;
  value: number;
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private api: ApiService) {}
  run(querySpec: Record<string, unknown>): Observable<EventRow[]> {
    return this.api.post<EventRow[]>('/api/search', { query_spec: querySpec });
  }
}
