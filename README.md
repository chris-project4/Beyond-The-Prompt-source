# Beyond the Prompt — Companion Code

Companion repository for *Beyond the Prompt: Spec-Driven Development and Context
Engineering for AI Coding Agents* by Chris Tagliaferro. It holds two worked
examples. The same method runs through both; the stacks differ on purpose, to
show that the method travels.

## Two examples
- **`dataslice/`** — the brownfield example used throughout the book: a
  few-years-old analytics dashboard (FastAPI + SQLAlchemy backend, Angular
  frontend) with established conventions and load-bearing services. You add one
  feature, Saved Searches with Alerts, the book's way. (Chapters 1-11.)
- **`issue-tracker/`** — the greenfield example from the final chapter: a
  brand-new issue tracker built end to end in TypeScript (Express + SQLite,
  Angular) with spec-driven development from the first commit. (Chapter 12.)

Each example has its own `start/` (build here) and `solution/` (the reference
implementation), plus a README with run instructions.

## License
Provided as companion material to the book for learning purposes.
