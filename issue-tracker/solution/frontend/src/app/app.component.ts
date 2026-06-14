import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="topbar">
      <a class="brand" routerLink="/">
        <span class="brand-caret">&gt;</span>
        <span class="brand-name">issue tracker</span>
      </a>
      <nav class="nav">
        <a routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }">Issues</a>
        <a routerLink="/new" routerLinkActive="is-active">New issue</a>
      </nav>
    </header>
    <main class="content"><router-outlet /></main>
  `,
})
export class AppComponent {}
