# Tasks: Saved Searches with Alerts

- [ ] Create the `SavedSearch` model and its Alembic migration.
- [ ] Add data-layer access in `app/data/saved_searches.py`.
- [ ] Implement `evaluate_saved_search`, reusing `SearchQuery` and
      `NotificationService`; honor first-run and notify-once rules.
- [ ] Register periodic evaluation with the existing worker.
- [ ] Add the API endpoints (list, create, delete, evaluate-now),
      following `app/api/reports.py`.
- [ ] Build the Angular `saved-searches` feature mirroring
      `features/reports/` (model, service, component), reusing the shared
      `ApiService`.
- [ ] Write tests encoding the three acceptance scenarios.
