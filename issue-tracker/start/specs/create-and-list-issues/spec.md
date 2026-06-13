# Spec: Create and list issues

## Intent
A user can create an issue with a title and optional description, and see all
issues newest first. This is the first feature; it establishes the issue
resource and the route -> service -> repository pattern everything else follows.

## User journey
A user opens the app, sees the issue list (empty at first), clicks "New issue",
enters a title and optional description, submits, and lands back on the list
with the new issue at the top.

## Scope
In: creating an issue, listing issues.
Out (for now): editing, closing, deleting, assignment (a later feature).

## Acceptance criteria
1. Creating an issue with a non-empty title returns the created issue with an
   id, status `open`, a null assignee, and a created timestamp.
2. Creating an issue with a missing or empty title is rejected with a 400 and a
   clear message; nothing is stored.
3. Listing issues returns every issue, newest first.
4. A newly created issue appears at the top of the list.

## Anchors & reuse
This is the first feature, so it authors the anchors: the `issues` table, the
`Issue` type, the repository pattern, the `AppError` flow, and body validation.
Later features reuse all of these rather than inventing parallels.

## Open questions
None for the first cut. Pagination is deferred until the list is large enough
to need it.
