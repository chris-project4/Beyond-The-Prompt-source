import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportsService } from './reports.service';
import { Report } from './report.model';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Reports</h2>
    <div class="card">
      <input [(ngModel)]="name" placeholder="Report name" />
      <input [(ngModel)]="types" placeholder="Event types (comma-separated)" style="margin:0 8px" />
      <button (click)="create()">Create</button>
    </div>
    @for (r of reports; track r.id) {
      <div class="card">
        <strong>{{ r.name }}</strong>
        <span class="muted"> · {{ r.query_spec | json }}</span>
        <button class="secondary" style="float:right" (click)="remove(r)">Delete</button>
      </div>
    }
    @if (reports.length === 0) {
      <p class="muted">No reports yet.</p>
    }
  `,
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [];
  name = '';
  types = '';

  constructor(private service: ReportsService) {}

  ngOnInit(): void {
    this.load();
  }
  load(): void {
    this.service.list().subscribe((rs) => (this.reports = rs));
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
  remove(r: Report): void {
    this.service.remove(r.id).subscribe(() => this.load());
  }
}
