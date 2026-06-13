# Plan: Saved Searches with Alerts

Approach, reviewed before implementation.

1. **Model.** Add a `SavedSearch` model: owner, name, serialized
   `query_spec`, nullable `last_run_at`, `created_at`. Ships an Alembic
   migration.
2. **Data layer.** Add `app/data/saved_searches.py` mirroring
   `app/data/reports.py` (list, get, create, delete, list_all).
3. **Evaluation service.** `evaluate_saved_search(session, id)` reuses
   `SearchQuery` to run the query with `newer_than=last_run_at`, and
   `NotificationService` to notify. Handle the three acceptance scenarios
   explicitly, especially first-run (set baseline, do not notify).
4. **Scheduling.** Register a periodic `evaluate_all_saved_searches` job on
   the existing worker. No new scheduler.
5. **API.** Add `app/api/saved_searches.py` following `app/api/reports.py`:
   list, create, delete, plus an evaluate-now endpoint.
6. **Frontend.** Add a `saved-searches` feature module matching the
   existing feature structure.
7. **Tests.** Encode the three acceptance scenarios as tests.

Constraints honored: reuse SearchQuery and NotificationService, existing
worker only, data layer only, AppError error shape, reports.py endpoint
style.
