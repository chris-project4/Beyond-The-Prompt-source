import { Router } from 'express';
import { issueService } from './issue.service';
import { parseCreateIssue, parseAssign } from '../validation';
import { badRequest } from '../errors';

// better-sqlite3 is synchronous, so these handlers are synchronous and any
// thrown AppError is caught by the error handler in app.ts.
export const issuesRouter = Router();

issuesRouter.post('/', (req, res) => {
  const input = parseCreateIssue(req.body);
  res.status(201).json(issueService.createIssue(input));
});

issuesRouter.get('/', (_req, res) => {
  res.json(issueService.listIssues());
});

issuesRouter.post('/:id/assign', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) throw badRequest('invalid issue id');
  res.json(issueService.assignIssue(id, parseAssign(req.body)));
});
