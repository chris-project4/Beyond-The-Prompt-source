import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IssueService } from './issue.service';
import { Issue } from './issue.model';

@Component({
  selector: 'app-issues-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Issues</h1>
    @if (loading()) {
      <p>Loading\u2026</p>
    } @else if (issues().length === 0) {
      <p>No issues yet. <a routerLink="/new">Create the first one.</a></p>
    } @else {
      <ul>
        @for (issue of issues(); track issue.id) {
          <li>
            <strong>#{{ issue.id }} {{ issue.title }}</strong>
            <span>[{{ issue.status }}]</span>
            @if (issue.assignee) {
              <span>assigned to {{ issue.assignee }}</span>
            } @else {
              <button (click)="assign(issue)">Assign to me</button>
            }
          </li>
        }
      </ul>
    }
  `,
})
export class IssuesListComponent implements OnInit {
  private readonly service = inject(IssueService);
  readonly issues = signal<Issue[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.loading.set(true);
    this.service.list().subscribe((list) => {
      this.issues.set(list);
      this.loading.set(false);
    });
  }

  assign(issue: Issue): void {
    this.service.assign(issue.id, 'me').subscribe(() => this.reload());
  }
}
