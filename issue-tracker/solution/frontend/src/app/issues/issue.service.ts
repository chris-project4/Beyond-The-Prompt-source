import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from './issue.model';

// The one place that knows the API shape. Components talk to this, never to
// HttpClient or URLs directly.
@Injectable({ providedIn: 'root' })
export class IssueService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/issues';

  list(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.base);
  }

  create(title: string, description: string): Observable<Issue> {
    return this.http.post<Issue>(this.base, { title, description });
  }

  assign(id: number, assignee: string): Observable<Issue> {
    return this.http.post<Issue>(`${this.base}/${id}/assign`, { assignee });
  }
}
