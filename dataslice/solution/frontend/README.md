# DataSlice — Frontend (Angular)

Angular standalone app for the DataSlice dashboard. See the root `README.md`
for the whole project and the start/ vs solution/ folder layout.

## Run

```bash
cd frontend
npm install
npm start        # http://localhost:4200  (expects the API on :8000)
```

## Layout
- `src/app/core/api.service.ts` — HTTP wrapper.
- `src/app/features/reports/` — the exemplar feature new features match.
- `src/app/features/search/` — ad-hoc search.
- `src/app/features/saved-searches/` — Saved Searches with Alerts (solution
  branch); mirrors the reports feature structure.
