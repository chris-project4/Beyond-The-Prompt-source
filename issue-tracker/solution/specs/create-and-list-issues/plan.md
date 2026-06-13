# Plan: Create and list issues

Build from the database outward, following the briefing's layering.

1. Schema and type: `issues` table in `db.ts`; `Issue` and `CreateIssueInput`
   in `types.ts`.
2. Repository: `issue.repository.ts` with `create`, `list`, `findById`, doing
   the snake_case/camelCase mapping.
3. Validation: `parseCreateIssue` in `validation.ts`.
4. Service: `issue.service.ts` with `createIssue` and `listIssues`.
5. Routes: `issue.routes.ts` with `POST /` and `GET /`, mounted at
   `/api/issues` in `app.ts`.
6. Frontend: `issue.model.ts`, `issue.service.ts`, then `issues-list` and
   `issue-create` components wired into the routes.
7. Tests: encode the four acceptance criteria against the service.

No new dependencies. Errors via `AppError` only.
