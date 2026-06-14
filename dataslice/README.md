# Beyond the Prompt — Companion Code: DataSlice

Companion repository for *Beyond the Prompt: Spec-Driven Development and
Context Engineering for AI Coding Agents* by Chris Tagliaferro. It contains
**DataSlice**, the brownfield analytics dashboard used as the running example
throughout the book: a FastAPI + SQLAlchemy backend and an Angular frontend,
built to resemble a real, few-years-old internal tool with established
conventions and load-bearing services.

You drive an AI coding agent to add one feature, **Saved Searches with
Alerts**, the way the book teaches.

## Two folders

- **`start/`** — DataSlice *before* the feature. **Work here.** Read
  `start/specs/saved-search-alerts/` for the spec, plan, and tasks,
  then implement the feature yourself, anchoring to the existing patterns.
- **`solution/`** — the same project *with* Saved Searches with Alerts
  implemented the book's way: anchored to existing patterns, reusing
  `SearchQuery`, `NotificationService`, and the worker, with the acceptance
  scenarios encoded as passing tests. Compare your work against it.

To see the change as a diff:

```bash
diff -ru start/ solution/
```

## Quick start

Pick a folder (`start` to build, `solution` to run the finished version),
then:

Backend (no database setup needed; uses SQLite):
```bash
cd solution/backend          # or start/backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
make seed
make dev                     # API at http://localhost:8000 (docs at /docs)
```

Frontend (second terminal):
```bash
cd solution/frontend         # or start/frontend
npm install
npm start                    # app at http://localhost:4200
```

Backend tests (in `solution`, the acceptance scenarios are encoded as tests):
```bash
cd solution/backend && make test
```

## Where the book's landmarks live (in each folder)
- `CLAUDE.md` — the project constitution (Appendix A).
- `specs/saved-search-alerts/` — product spec, plan, tasks
  (Chapters 6–7, Appendix B).
- `backend/app/search/query.py` — `SearchQuery`, the one search path.
- `backend/app/notifications/service.py` — `NotificationService`.
- `backend/app/api/reports.py` — the endpoint exemplar.
- `solution/backend/app/services/saved_search_service.py` —
  `evaluate_saved_search`, honoring the acceptance criteria.

## License
Provided as companion material to the book for learning purposes.
