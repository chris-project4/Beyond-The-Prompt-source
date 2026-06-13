"""Report service. Thin here, but the place feature logic would live,
keeping routers focused on HTTP concerns."""
from sqlalchemy.orm import Session

from app.data import reports as reports_data


def list_reports_for(session: Session, owner_id: int):
    return reports_data.list_reports(session, owner_id)
