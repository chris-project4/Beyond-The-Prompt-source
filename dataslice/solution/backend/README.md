# DataSlice — Backend (FastAPI)

Internal analytics dashboard API. See the root `README.md` for the whole
project and the start/ vs solution/ folder layout.

## Run

**Mac/Linux:**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
make seed     # demo user + sample events (SQLite, no setup needed)
make dev      # http://localhost:8000  (docs at /docs)
```

**Windows (PowerShell):**
```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m scripts.seed        # demo user + sample events (SQLite, no setup needed)
uvicorn app.main:app --reload # http://localhost:8000  (docs at /docs)
```

## Test

**Mac/Linux:**
```bash
make test
```

**Windows (PowerShell):**
```powershell
pytest -q
```

## Layout
- `app/search/query.py` — SearchQuery, the one search path.
- `app/notifications/service.py` — NotificationService (in-app + email).
- `app/worker/` — the background worker.
- `app/data/` — data access (no raw SQL elsewhere).
- `app/api/reports.py` — the endpoint exemplar new routers should match.
- `app/errors.py` — AppError; rendered as `{ "error": { "code", "message" } }`.
The project constitution (`CLAUDE.md`) and the feature `specs/` live one
level up, at the project root (`dataslice/start/` or `dataslice/solution/`).

Production uses Postgres (set `DATABASE_URL`) and Alembic (`make migrate`);
dev uses SQLite and auto-creates tables for zero-setup running.
