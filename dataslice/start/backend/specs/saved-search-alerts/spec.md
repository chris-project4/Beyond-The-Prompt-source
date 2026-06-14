# Spec: Saved Searches with Alerts

## Intent
Let a user save a search they have built and be notified when new results
appear for it, so they can monitor a query over time without re-running it
by hand. The "why": turn DataSlice from a pull tool into one that can push.

## User journey
1. A user builds a search in the dashboard and clicks "Save search," giving
   it a name.
2. The saved search appears in their list of saved searches.
3. On a schedule, DataSlice re-runs each saved search.
4. When a saved search has results newer than its last run, the owner is
   notified (in-app and email).

## Scope
In scope:
- Creating, listing, and deleting saved searches.
- Scheduled evaluation of saved searches.
- Notifying the owner once per evaluation when new results exist.

Out of scope:
- Sharing saved searches between users.
- Configurable per-search schedules (all use the default interval).
- Digest/batching across multiple saved searches.

## Acceptance criteria

Scenario: New results since last run
  Given a saved search owned by a user
  And the search has been evaluated before, recording last_run_at
  When the search is evaluated and there are results newer than last_run_at
  Then the owner is notified once via NotificationService
  And last_run_at is advanced to the time of this evaluation

Scenario: No new results
  Given a saved search that has been evaluated before
  When the search is evaluated and there are no results newer than last_run_at
  Then no notification is sent
  And last_run_at is advanced to the time of this evaluation

Scenario: First-ever evaluation
  Given a saved search that has never been evaluated
  When the search is evaluated
  Then existing results do not trigger a notification
  And last_run_at is set so that only future results count as new

Scenario: Saved searches are private to their owner
  Given a saved search owned by one user
  When a different user lists, evaluates, or deletes it
  Then it does not appear in that user's list
  And the evaluate and delete requests are rejected as forbidden
  And the saved search is unchanged

## Anchors & reuse
- Endpoints follow `app/api/reports.py` exactly.
- Run the query via `SearchQuery` (`app/search/query.py`); never write new
  search execution.
- Notify via `NotificationService` (`app/notifications/service.py`); never
  call the email provider directly.
- Schedule evaluation on the existing worker (`app/worker/`); no new
  scheduler.
- Persist via the data layer (`app/data/`); no raw SQL.
- Frontend: build the `saved-searches` feature mirroring
  `src/app/features/reports/` (model, service, component); the service goes
  through the shared `ApiService`, and the component uses the built-in
  control flow. No new state patterns.

## Open questions
- None outstanding. (Per-search schedules deferred; see Out of scope.)
