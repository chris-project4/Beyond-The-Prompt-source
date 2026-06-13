"""Data access for reports. The exemplar to match for new data modules."""
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.report import Report


def list_reports(session: Session, owner_id: int) -> list[Report]:
    stmt = select(Report).where(Report.owner_id == owner_id).order_by(Report.created_at.desc())
    return list(session.execute(stmt).scalars().all())


def get_report(session: Session, report_id: int) -> Report | None:
    return session.get(Report, report_id)


def create_report(session: Session, owner_id: int, name: str, query_spec: dict) -> Report:
    report = Report(owner_id=owner_id, name=name, query_spec=query_spec)
    session.add(report)
    session.flush()
    return report


def delete_report(session: Session, report: Report) -> None:
    session.delete(report)
    session.flush()
