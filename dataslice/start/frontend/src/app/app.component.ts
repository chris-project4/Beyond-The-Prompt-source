import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="topbar">
      <span class="brand">
        <span class="brand-caret">&gt;</span>
        <span class="brand-name">dataslice</span>
      </span>
      <nav class="nav">
        <a routerLink="/reports" routerLinkActive="active">Reports</a>
        <a routerLink="/search" routerLinkActive="active">Search</a>
      </nav>
    </header>
    <main class="content"><router-outlet></router-outlet></main>
  `,
})
export class AppComponent {}
