# Issue Tracker — backend (Express + TypeScript)

```bash
npm install
npm run dev     # API on http://localhost:3000
npm test        # acceptance criteria as tests
```

Layering is one direction only: route -> service -> repository. Errors are
thrown as `AppError` and shaped into JSON by the handler in `src/app.ts`.
