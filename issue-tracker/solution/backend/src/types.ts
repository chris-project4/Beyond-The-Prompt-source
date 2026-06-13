export type IssueStatus = 'open' | 'closed';

export interface Issue {
  id: number;
  title: string;
  description: string;
  status: IssueStatus;
  assignee: string | null;
  createdAt: string;
}

export interface CreateIssueInput {
  title: string;
  description: string;
}

export interface AssignInput {
  assignee: string;
}
