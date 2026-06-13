"""Data access for saved searches. Modelled on app/data/reports.py."""
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.saved_search import SavedSearch


def list_saved_searches(session: Session, owner_id: int) -> list[SavedSearch]:
    stmt = (
        select(SavedSearch)
        .where(SavedSearch.owner_id == owner_id)
        .order_by(SavedSearch.created_at.desc())
    )
    return list(session.execute(stmt).scalars().all())


def list_all(session: Session) -> list[SavedSearch]:
    return list(session.execute(select(SavedSearch)).scalars().all())


def get_saved_search(session: Session, saved_search_id: int) -> SavedSearch | None:
    return session.get(SavedSearch, saved_search_id)


def create_saved_search(session: Session, owner_id: int, name: str, query_spec: dict) -> SavedSearch:
    saved = SavedSearch(owner_id=owner_id, name=name, query_spec=query_spec)
    session.add(saved)
    session.flush()
    return saved


def delete_saved_search(session: Session, saved: SavedSearch) -> None:
    session.delete(saved)
    session.flush()
