"""SearchQuery: the single, blessed path for executing searches over events.

ALL searches in DataSlice run through this module. Do not write new search
execution elsewhere; reuse SearchQuery so behaviour stays consistent.
"""
from datetime import datetime
from typing import Optional

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.event import Event


class SearchQuery:
    """Builds and runs a query over events from a serializable spec.

    Spec shape (all keys optional):
        {
          "types":   ["signup", "purchase"],
          "sources": ["web", "ios"],
          "min_value": 10.0,
          "since": "2026-01-01T00:00:00",   # ISO 8601
          "until": "2026-02-01T00:00:00"
        }
    """

    def __init__(self, session: Session):
        self.session = session

    def run(self, spec: dict, newer_than: Optional[datetime] = None) -> list[Event]:
        stmt = select(Event)
        if spec.get("types"):
            stmt = stmt.where(Event.type.in_(spec["types"]))
        if spec.get("sources"):
            stmt = stmt.where(Event.source.in_(spec["sources"]))
        if spec.get("min_value") is not None:
            stmt = stmt.where(Event.value >= spec["min_value"])
        since = _parse_dt(spec.get("since"))
        if since:
            stmt = stmt.where(Event.occurred_at >= since)
        until = _parse_dt(spec.get("until"))
        if until:
            stmt = stmt.where(Event.occurred_at <= until)
        if newer_than is not None:
            stmt = stmt.where(Event.occurred_at > newer_than)
        stmt = stmt.order_by(Event.occurred_at.desc())
        return list(self.session.execute(stmt).scalars().all())


def _parse_dt(raw):
    if not raw:
        return None
    if isinstance(raw, datetime):
        return raw
    return datetime.fromisoformat(raw)
