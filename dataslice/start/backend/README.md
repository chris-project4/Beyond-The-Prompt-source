# DataSlice — Backend (FastAPI)

Internal analytics dashboard API. See the root `README.md` for the whole
project and the start/ vs solution/ folder layout.

## Run

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
make seed     # demo user + sample events (SQLite, no setup needed)
make dev      # http://localhost:8000  (docs at /docs)
```

## Test

```bash
make test
```

## Layout
- `app/search/query.py` — SearchQuery, the one search path.
- `app/notifications/service.py` — NotificationService (in-app + email).
- `app/worker/` — the background worker.
- `app/data/` — data access (no raw SQL elsewhere).
- `app/api/reports.py` — the endpoint exemplar new routers should match.
- `app/errors.py` — AppError; rendered as `{ "error": { "code", "message" } }`.
- `specs/` — the product spec, plan, and tasks for the running feature.
- `CLAUDE.md` — the project constitution / always-loaded briefing.

Production uses Postgres (set `DATABASE_URL`) and Alembic (`make migrate`);
dev uses SQLite and auto-creates tables for zero-setup running.
