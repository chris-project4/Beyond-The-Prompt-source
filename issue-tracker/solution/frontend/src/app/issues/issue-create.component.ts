import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IssueService } from './issue.service';

@Component({
  selector: 'app-issue-create',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h1>New issue</h1>
    <form (ngSubmit)="submit()">
      <label>Title
        <input name="title" [(ngModel)]="title" required>
      </label>
      <label>Description
        <textarea name="description" [(ngModel)]="description"></textarea>
      </label>
      @if (error()) { <p class="error">{{ error() }}</p> }
      <button type="submit" [disabled]="!title.trim()">Create issue</button>
    </form>
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
