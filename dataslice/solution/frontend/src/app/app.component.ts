import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header style="padding:16px 24px;border-bottom:1px solid var(--border);display:flex;gap:24px;align-items:center">
      <strong style="font-size:20px">DataSlice</strong>
      <nav style="display:flex;gap:16px">
        <a routerLink="/reports" routerLinkActive="active">Reports</a>
        <a routerLink="/search" routerLinkActive="active">Search</a>
        <a routerLink="/saved-searches" routerLinkActive="active">Saved Searches</a>
      </nav>
    </header>
    <main style="max-width:860px;margin:0 auto;padding:24px">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {}
