# DataSlice Project Briefing

## What this is
DataSlice is an internal analytics dashboard. Backend: FastAPI + SQLAlchemy
over Postgres. Frontend: Angular + TypeScript. Request flow: router ->
service -> data layer. Background jobs run on the existing worker.

## Run & test
- Dev server: `make dev`
- Tests: `make test` (pytest). Run the tests before proposing a change
  as done; a change is not done until its tests pass.
- Migrations: `make migrate` (Alembic). Every schema change ships a
  migration.

## Reuse these (do not reinvent)
- Search execution: `app/search/query.py` (SearchQuery). ALL searches
  run through this. Never write new search execution.
- Notifications (in-app + email): `app/notifications/service.py`
  (NotificationService). Never call the email provider SDK directly.
- Scheduled / background work: the worker in `app/worker/`. Never add a
  new scheduler or background-job framework.
- Data access: `app/data/`. Never write raw SQL outside this layer.
- Validation: the shared validators in `app/validation/`.
- Frontend data access: the shared `ApiService` in
  `src/app/core/api.service.ts`. Feature services call it; components
  never use `HttpClient` or `fetch` directly.

## Conventions
- Errors: raise `AppError` subclasses (`app/errors.py`). The API layer
  renders them as `{ "error": { "code", "message" } }`. Never return a
  bare string error or a raw 500.
- API endpoints: follow the shape of `app/api/reports.py`. New routers
  should be indistinguishable from it in structure and style.
- Naming: snake_case in Python, camelCase in TypeScript. Match the
  surrounding file.
- Frontend: new feature modules follow `src/app/features/reports/`
  (model, service, component) and should be indistinguishable from it in
  structure. Reuse the shared `ApiService`; use the built-in control flow
  (`@if`, `@for`); do not introduce new state patterns.

## Security
- Validate input through `app/validation/` at the boundary; never trust client input.
- All data access goes through `app/data/` (SQLAlchemy, parameterized); never build raw SQL.
- Secrets and connection strings come from the environment, never from source or the repo.
- Dependencies are pinned to exact versions; a new one needs explicit approval in the spec.

## Hard constraints
- No raw SQL outside `app/data/`.
- No new third-party dependency unless explicitly approved in the spec.
- No new scheduler; use the existing worker.
- No direct email-provider calls; use NotificationService.

## How we work
- Code is derived from a spec in `specs/`. The spec leads; if behavior
  must change, change the spec first.
- Anchor every nontrivial decision to an existing file or service named
  above. Prefer matching an exemplar over inventing an approach.
