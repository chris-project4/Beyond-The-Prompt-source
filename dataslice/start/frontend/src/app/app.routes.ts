import { Routes } from '@angular/router';
import { ReportsComponent } from './features/reports/reports.component';
import { SearchComponent } from './features/search/search.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'reports' },
  { path: 'reports', component: ReportsComponent },
  { path: 'search', component: SearchComponent },
];
