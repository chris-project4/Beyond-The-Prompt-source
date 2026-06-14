# Spec: Assign an issue to a user

## Intent
A user can assign an existing issue to a named assignee so work tracks to a
person. This feature anchors entirely to the patterns the first feature set.

## User journey
On the issues list, an unassigned issue shows an "Assign to me" action.
Assigning it updates the issue, and the list reflects the new assignee.

## Scope
In: setting an assignee on an existing issue.
Out: unassignment, reassignment workflows, notifications.

## Acceptance criteria
1. Assigning an existing issue to a non-empty assignee returns the updated issue
   with that assignee set.
2. Assigning an issue that does not exist returns a 404.
3. Assigning with a missing or empty assignee is rejected with a 400; the issue
   is unchanged.

## Anchors & reuse
Reuse the `issues` table (add the assignee write path to the repository, not a
new table), the route -> service -> repository layering, `AppError` for the 404
and 400, and `validation.ts` for the body. No new patterns.

## Open questions
None.
