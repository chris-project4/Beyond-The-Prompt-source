"""Reports API. This module is the exemplar: new routers (including saved
searches) should match its structure, error handling, and style exactly.

Flow: router -> service/data layer. Errors are raised as AppError and
rendered by the app-level handler as { "error": { "code", "message" } }.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_session, current_user_id
from app.data import reports as reports_data
from app.errors import NotFoundError, PermissionError
from app.schemas.reports import ReportCreate, ReportOut
from app.validation.validators import validate_name, validate_query_spec

router = APIRouter(prefix="/api/reports", tags=["reports"])


@router.get("", response_model=list[ReportOut])
def list_reports(session: Session = Depends(get_session), user_id: int = Depends(current_user_id)):
    return reports_data.list_reports(session, owner_id=user_id)


@router.post("", response_model=ReportOut, status_code=201)
def create_report(
    payload: ReportCreate,
    session: Session = Depends(get_session),
    user_id: int = Depends(current_user_id),
):
    name = validate_name(payload.name)
    spec = validate_query_spec(payload.query_spec)
    report = reports_data.create_report(session, owner_id=user_id, name=name, query_spec=spec)
    session.commit()
    return report


@router.delete("/{report_id}", status_code=204)
def delete_report(
    report_id: int,
    session: Session = Depends(get_session),
    user_id: int = Depends(current_user_id),
):
    report = reports_data.get_report(session, report_id)
    if report is None:
        raise NotFoundError(f"report {report_id} not found")
    if report.owner_id != user_id:
        raise PermissionError("you do not own this report")
    reports_data.delete_report(session, report)
    session.commit()
