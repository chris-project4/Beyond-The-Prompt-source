import { Component, OnInit, signal } from '@angular/core';
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
      <input
        [ngModel]="types()"
        (ngModelChange)="types.set($event)"
        placeholder="e.g. signup, purchase, login, error"
      />
      <button (click)="run()" style="margin-left:8px">Run</button>
      <p class="muted" style="margin:8px 0 0">
        Seeded event types: signup, purchase, login, error. Leave blank and Run to list everything.
      </p>
    </div>
    @for (e of results(); track e.id) {
      <div class="card">
        <strong>{{ e.type }}</strong>
        <span class="muted"> · {{ e.source }} · {{ e.occurred_at }} · {{ e.value }}</span>
      </div>
    }
    @if (ran() && results().length === 0) {
      <p class="muted">No matching events.</p>
    }
  `,
})
export class SearchComponent implements OnInit {
  types = signal('');
  results = signal<EventRow[]>([]);
  ran = signal(false);

  constructor(private service: SearchService) {}

  ngOnInit(): void {
    this.run();
  }

  run(): void {
    const value = this.types().trim();
    const spec = value ? { types: value.split(',').map((t) => t.trim()) } : {};
    this.service.run(spec).subscribe((rs) => {
      this.results.set(rs);
      this.ran.set(true);
    });
  }
}
