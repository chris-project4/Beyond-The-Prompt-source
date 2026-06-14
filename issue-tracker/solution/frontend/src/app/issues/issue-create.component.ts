import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IssueService } from './issue.service';

@Component({
  selector: 'app-issue-create',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <section class="page page-narrow">
      <div class="page-head">
        <h1 class="page-title">New issue</h1>
      </div>
      <form class="panel form" (ngSubmit)="submit()">
        <label class="field">
          <span class="field-label">Title</span>
          <input class="input" name="title" [(ngModel)]="title" placeholder="Short summary of the problem" required />
        </label>
        <label class="field">
          <span class="field-label">Description</span>
          <textarea class="input textarea" name="description" [(ngModel)]="description" placeholder="What happened, and what you expected" rows="5"></textarea>
        </label>
        @if (error()) {
          <p class="form-error">{{ error() }}</p>
        }
        <div class="form-actions">
          <a class="btn btn-ghost" routerLink="/">Cancel</a>
          <button class="btn btn-primary" type="submit" [disabled]="!title.trim()">Create issue</button>
        </div>
      </form>
    </section>
  `,
})
export class IssueCreateComponent {
  private readonly service = inject(IssueService);
  private readonly router = inject(Router);
  title = '';
  description = '';
  readonly error = signal<string | null>(null);

  submit(): void {
    if (!this.title.trim()) {
      this.error.set('Title is required');
      return;
    }
    this.service.create(this.title.trim(), this.description.trim()).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.error.set('Could not create issue'),
    });
  }
}
