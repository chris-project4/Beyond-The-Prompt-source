# Issue Tracker — greenfield example

The greenfield companion to the book: a brand-new issue tracker built end to end
in TypeScript (Express + SQLite backend, Angular frontend) with spec-driven
development from the first commit. It is the counterpart to DataSlice. The same
method that tames a years-old brownfield system also authors a fresh one; the
stack is different on purpose.

## Two folders
- `start/` — the constitution (`CLAUDE.md`) and all three specs, with a
  booting but feature-less skeleton. Build here.
- `solution/` — both features implemented (create-and-list issues, then assign):
  the constitution, the specs, and the acceptance criteria encoded as tests.

## Build order (matches Chapter 12)
1. Read `start/CLAUDE.md`, the constitution, authored before any feature.
2. Build `create-and-list-issues` from its spec, plan, and tasks.
3. Build `assign-issue`, anchoring to the patterns the first feature set.
4. Apply `polished-ui`, restyling the existing components to the design system (the look is spec-driven too).

## Run
- Backend: `cd solution/backend && npm install && npm run dev` (http://localhost:3000).
- Frontend: `cd solution/frontend && npm install && npm start` (http://localhost:4200).
- Tests: `cd solution/backend && npm test`.

See it as a diff: `diff -ru start/ solution/`.
