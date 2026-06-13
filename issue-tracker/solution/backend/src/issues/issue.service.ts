import { issueRepository } from './issue.repository';
import { CreateIssueInput, AssignInput, Issue } from '../types';
import { notFound } from '../errors';

export const issueService = {
  createIssue(input: CreateIssueInput): Issue {
    return issueRepository.create(input.title, input.description);
  },

  listIssues(): Issue[] {
    return issueRepository.list();
  },

  assignIssue(id: number, input: AssignInput): Issue {
    const updated = issueRepository.assign(id, input.assignee);
    if (!updated) throw notFound(`issue ${id} not found`);
    return updated;
  },
};
