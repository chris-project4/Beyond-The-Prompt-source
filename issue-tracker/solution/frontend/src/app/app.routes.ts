import { Routes } from '@angular/router';
import { IssuesListComponent } from './issues/issues-list.component';
import { IssueCreateComponent } from './issues/issue-create.component';

export const routes: Routes = [
  { path: '', component: IssuesListComponent },
  { path: 'new', component: IssueCreateComponent },
];
