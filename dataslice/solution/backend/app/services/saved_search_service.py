"""Saved-search evaluation. Reuses SearchQuery to run the query and
NotificationService to notify; never reimplements either.

Behaviour (from the spec's acceptance criteria):
  - New results since last_run_at  -> notify the owner ONCE, advance last_run_at.
  - No new results                 -> no notification, advance last_run_at.
  - First-ever evaluation          -> do NOT notify for pre-existing results;
                                      set last_run_at so only future events count.
"""
from datetime import datetime

from sqlalchemy.orm import Session

from app.data import saved_searches as data
from app.db import SessionLocal
from app.errors import NotFoundError
from app.notifications.service import NotificationService
from app.search.query import SearchQuery


def evaluate_saved_search(session: Session, saved_search_id: int) -> int:
    """Evaluate one saved search. Returns the number of new results found
    (0 on the first-ever run, which never notifies)."""
    saved = data.get_saved_search(session, saved_search_id)
    if saved is None:
        raise NotFoundError(f"saved search {saved_search_id} not found")

    now = datetime.utcnow()

    # First-ever evaluation: establish the baseline without notifying so the
    # user is not alerted for the entire history the moment they save.
    if saved.last_run_at is None:
        saved.last_run_at = now
        session.flush()
        return 0

    results = SearchQuery(session).run(saved.query_spec, newer_than=saved.last_run_at)
    if results:
        NotificationService(session).send(
            user_id=saved.owner_id,
            subject=f"New results for '{saved.name}'",
            body=f"{len(results)} new result(s) matched your saved search '{saved.name}'.",
        )
    saved.last_run_at = now
    session.flush()
    return len(results)


def evaluate_all_saved_searches() -> None:
    """Worker entry point: evaluate every saved search in its own session."""
    session = SessionLocal()
    try:
        for saved in data.list_all(session):
            evaluate_saved_search(session, saved.id)
        session.commit()
    finally:
        session.close()
