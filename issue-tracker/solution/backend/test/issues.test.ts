// Acceptance criteria from specs/create-and-list-issues and specs/assign-issue,
// encoded as tests. Run with: npm test
process.env.ISSUE_TRACKER_DB = ':memory:';

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { issueService } from '../src/issues/issue.service';

test('creating an issue returns it open, unassigned, with an id', () => {
  const issue = issueService.createIssue({ title: 'First issue', description: 'hello' });
  assert.ok(issue.id > 0);
  assert.equal(issue.status, 'open');
  assert.equal(issue.assignee, null);
  assert.ok(issue.createdAt);
});

test('listing returns newest first', () => {
  issueService.createIssue({ title: 'older', description: '' });
  const newer = issueService.createIssue({ title: 'newer', description: '' });
  assert.equal(issueService.listIssues()[0].id, newer.id);
});

test('assigning sets the assignee', () => {
  const issue = issueService.createIssue({ title: 'assign me', description: '' });
  assert.equal(issueService.assignIssue(issue.id, { assignee: 'alice' }).assignee, 'alice');
});

test('assigning a missing issue throws not found', () => {
  assert.throws(() => issueService.assignIssue(99999, { assignee: 'bob' }), /not found/);
});
