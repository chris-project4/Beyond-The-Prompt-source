import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService, EventRow } from './search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Search</h2>
    <div class="card">
      <input [(ngModel)]="types" placeholder="Event types (comma-separated)" />
      <button (click)="run()" style="margin-left:8px">Run</button>
    </div>
    @for (e of results; track e.id) {
      <div class="card">
        <strong>{{ e.type }}</strong>
        <span class="muted"> · {{ e.source }} · {{ e.occurred_at }} · {{ e.value }}</span>
      </div>
    }
    @if (ran && results.length === 0) {
      <p class="muted">No matching events.</p>
    }
  `,
})
export class SearchComponent {
  types = '';
  results: EventRow[] = [];
  ran = false;

  constructor(private service: SearchService) {}

  run(): void {
    const spec = this.types.trim()
      ? { types: this.types.split(',').map((t) => t.trim()) }
      : {};
    this.service.run(spec).subscribe((rs) => {
      this.results = rs;
      this.ran = true;
    });
  }
}
