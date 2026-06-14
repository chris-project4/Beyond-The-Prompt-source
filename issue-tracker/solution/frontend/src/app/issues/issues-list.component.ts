import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IssueService } from './issue.service';
import { Issue } from './issue.model';

@Component({
  selector: 'app-issues-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page">
      <div class="page-head">
        <h1 class="page-title">Issues</h1>
        @if (!loading()) {
          <span class="count">{{ issues().length }}</span>
          <a class="btn btn-primary page-action" routerLink="/new">New issue</a>
        }
      </div>

      @if (loading()) {
        <p class="muted">Loading issues</p>
      } @else if (issues().length === 0) {
        <div class="empty">
          <div class="empty-caret">&gt;</div>
          <h2 class="empty-title">No issues yet</h2>
          <p class="muted">Open the first one to get started.</p>
          <a class="btn btn-primary" routerLink="/new">New issue</a>
        </div>
      } @else {
        <ul class="issues">
          @for (issue of issues(); track issue.id) {
            <li class="issue" [class.is-closed]="issue.status === 'closed'">
              <span class="issue-id">#{{ issue.id }}</span>
              <div class="issue-main">
                <span class="issue-title">{{ issue.title }}</span>
                @if (issue.description) {
                  <span class="issue-desc">{{ issue.description }}</span>
                }
              </div>
              <span class="pill" [class.pill-open]="issue.status === 'open'">{{ issue.status }}</span>
              @if (issue.assignee) {
                <span class="chip">{{ issue.assignee }}</span>
              } @else {
                <button class="btn btn-ghost" (click)="assign(issue)">Assign to me</button>
              }
              <time class="issue-date">{{ date(issue.createdAt) }}</time>
            </li>
          }
        </ul>
      }
    </section>
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

  date(iso: string): string {
    return iso ? iso.slice(0, 10) : '';
  }
}
