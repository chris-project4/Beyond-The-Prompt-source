import { badRequest } from './errors';
import { CreateIssueInput, AssignInput } from './types';

export function parseCreateIssue(body: unknown): CreateIssueInput {
  const b = body as Record<string, unknown>;
  if (!b || typeof b.title !== 'string' || b.title.trim() === '') {
    throw badRequest('title is required');
  }
  if (b.description !== undefined && typeof b.description !== 'string') {
    throw badRequest('description must be a string');
  }
  return { title: b.title.trim(), description: String(b.description ?? '').trim() };
}

export function parseAssign(body: unknown): AssignInput {
  const b = body as Record<string, unknown>;
  if (!b || typeof b.assignee !== 'string' || b.assignee.trim() === '') {
    throw badRequest('assignee is required');
  }
  return { assignee: b.assignee.trim() };
}
