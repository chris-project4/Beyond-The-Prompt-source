# Plan: Assign an issue

A thin slice on top of the first feature. No new files on the backend.

1. Repository: add `assign(id, assignee)`, returning null when no row changes.
2. Validation: add `parseAssign`.
3. Service: add `assignIssue`, throwing `notFound` when the repository returns
   null.
4. Routes: add `POST /:id/assign`.
5. Frontend: add `assign` to the issue service and an "Assign to me" action in
   the list component.
6. Tests: assign success, assign-missing (404), empty assignee (400).
