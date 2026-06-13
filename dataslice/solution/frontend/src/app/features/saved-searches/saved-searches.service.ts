import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { SavedSearch } from './saved-search.model';

@Injectable({ providedIn: 'root' })
export class SavedSearchesService {
  constructor(private api: ApiService) {}

  list(): Observable<SavedSearch[]> {
    return this.api.get<SavedSearch[]>('/api/saved-searches');
  }
  create(name: string, querySpec: Record<string, unknown>): Observable<SavedSearch> {
    return this.api.post<SavedSearch>('/api/saved-searches', { name, query_spec: querySpec });
  }
  evaluate(id: number): Observable<SavedSearch> {
    return this.api.post<SavedSearch>(`/api/saved-searches/${id}/evaluate`, {});
  }
  remove(id: number): Observable<void> {
    return this.api.delete<void>(`/api/saved-searches/${id}`);
  }
}
