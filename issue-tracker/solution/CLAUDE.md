# Issue Tracker — Project Briefing

## What this is
A small issue tracker, built greenfield to show spec-driven development on a
fresh, end-to-end TypeScript stack: an Express + TypeScript backend over SQLite,
and an Angular frontend. There is no legacy here. This briefing exists to
*author* the conventions an agent should follow, not to document ones that
already exist.

## Run & test
- Backend: `cd backend && npm install && npm run dev` (API on http://localhost:3000).
- Backend tests: `cd backend && npm test`.
- Frontend: `cd frontend && npm install && npm start` (app on http://localhost:4200, /api proxied).

## Reuse these (do not reinvent)
- Data access goes through one repository module per resource
  (`issues/issue.repository.ts`). Routes and services never touch the database.
- HTTP failures are thrown as `AppError` (`errors.ts`); the handler in `app.ts`
  turns them into JSON. Do not write ad hoc error responses.
- Request bodies are validated in `validation.ts` before a service sees them.

## Conventions
- TypeScript everywhere, strict mode on, no `any` in committed code.
- One direction of dependency: route -> service -> repository.
- snake_case in the database, camelCase in TypeScript; map between them in the
  repository and nowhere else.
- The frontend uses standalone components and built-in control flow
  (`@if`, `@for`), and reaches the API only through a typed service.

## Security
- Validate every request body in `validation.ts` before a service sees it; never trust client input.
- All SQL goes through the repository with parameterized statements (the `?` placeholders); never concatenate values into a query.
- Configuration and secrets come from the environment (for example `ISSUE_TRACKER_DB`), never hard-coded and never committed.
- Dependencies are pinned to exact versions; a new one needs a line in the spec justifying it.
This example has no auth layer, so there are no protected routes yet; in a real service an explicit authorization check on every protected route belongs here too.

## Design
- The UI follows one design system, defined as tokens in `styles.css`: Signal
  Lime on near-black, Space Grotesk for the interface and JetBrains Mono for
  data. Draw from the tokens; never hard-code a colour or font in a component.
- Colour is functional: lime is the primary action and focus, orange is an
  assignee. Hairline borders over shadows, mono for ids and dates, a visible
  focus ring, and reduced-motion respected. See `specs/polished-ui` for intent.

## Hard constraints
- SQLite via better-sqlite3, used synchronously. No ORM.
- No new runtime dependency without a line in the spec explaining why.
- Every feature ships with its acceptance criteria encoded as tests.

## How we work
Specs live in `specs/<feature>/` as `spec.md`, `plan.md`, and `tasks.md`. Build
one feature at a time: specify, plan against these conventions, break into
tasks, implement. The first feature sets the patterns the next ones anchor to.
