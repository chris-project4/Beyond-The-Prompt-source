import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SavedSearchesService } from './saved-searches.service';
import { SavedSearch } from './saved-search.model';

@Component({
  selector: 'app-saved-searches',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Saved Searches</h2>
    <div class="card">
      <input [(ngModel)]="name" placeholder="Saved search name" />
      <input [(ngModel)]="types" placeholder="Event types (comma-separated)" style="margin:0 8px" />
      <button (click)="create()">Save</button>
    </div>
    @for (s of searches; track s.id) {
      <div class="card">
        <strong>{{ s.name }}</strong>
        <span class="muted"> · last run: {{ s.last_run_at || 'never' }}</span>
        <button class="secondary" style="float:right;margin-left:8px" (click)="remove(s)">Delete</button>
        <button style="float:right" (click)="evaluate(s)">Evaluate now</button>
      </div>
    }
    @if (searches.length === 0) {
      <p class="muted">No saved searches yet.</p>
    }
  `,
})
export class SavedSearchesComponent implements OnInit {
  searches: SavedSearch[] = [];
  name = '';
  types = '';

  constructor(private service: SavedSearchesService) {}

  ngOnInit(): void {
    this.load();
  }
  load(): void {
    this.service.list().subscribe((ss) => (this.searches = ss));
  }
  create(): void {
    const spec = this.types.trim()
      ? { types: this.types.split(',').map((t) => t.trim()) }
      : {};
    this.service.create(this.name, spec).subscribe(() => {
      this.name = '';
      this.types = '';
      this.load();
    });
  }
  evaluate(s: SavedSearch): void {
    this.service.evaluate(s.id).subscribe(() => this.load());
  }
  remove(s: SavedSearch): void {
    this.service.remove(s.id).subscribe(() => this.load());
  }
}
