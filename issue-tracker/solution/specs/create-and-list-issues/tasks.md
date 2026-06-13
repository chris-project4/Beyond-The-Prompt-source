# Tasks: Create and list issues

- [ ] Add the `issues` table to `db.ts` (id, title, description, status,
      assignee, created_at).
- [ ] Add `Issue`, `IssueStatus`, `CreateIssueInput` to `types.ts`.
- [ ] Implement `issueRepository.create/list/findById` with row mapping.
- [ ] Implement `parseCreateIssue` (reject empty title with `badRequest`).
- [ ] Implement `issueService.createIssue/listIssues`.
- [ ] Add `POST /` and `GET /` routes; mount at `/api/issues`.
- [ ] Frontend: model, service, list component (`@if`/`@for`), create form.
- [ ] Tests for acceptance criteria 1-4.
