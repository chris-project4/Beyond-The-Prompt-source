"""Saved Searches API. Follows app/api/reports.py exactly in structure,
error handling, and style."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_session, current_user_id
from app.data import saved_searches as data
from app.errors import NotFoundError, PermissionError
from app.schemas.saved_searches import SavedSearchCreate, SavedSearchOut
from app.services.saved_search_service import evaluate_saved_search
from app.validation.validators import validate_name, validate_query_spec

router = APIRouter(prefix="/api/saved-searches", tags=["saved-searches"])


@router.get("", response_model=list[SavedSearchOut])
def list_saved_searches(session: Session = Depends(get_session), user_id: int = Depends(current_user_id)):
    return data.list_saved_searches(session, owner_id=user_id)


@router.post("", response_model=SavedSearchOut, status_code=201)
def create_saved_search(
    payload: SavedSearchCreate,
    session: Session = Depends(get_session),
    user_id: int = Depends(current_user_id),
):
    name = validate_name(payload.name)
    spec = validate_query_spec(payload.query_spec)
    saved = data.create_saved_search(session, owner_id=user_id, name=name, query_spec=spec)
    session.commit()
    return saved


@router.post("/{saved_search_id}/evaluate", response_model=SavedSearchOut)
def evaluate_now(
    saved_search_id: int,
    session: Session = Depends(get_session),
    user_id: int = Depends(current_user_id),
):
    saved = data.get_saved_search(session, saved_search_id)
    if saved is None:
        raise NotFoundError(f"saved search {saved_search_id} not found")
    if saved.owner_id != user_id:
        raise PermissionError("you do not own this saved search")
    evaluate_saved_search(session, saved_search_id)
    session.commit()
    return saved


@router.delete("/{saved_search_id}", status_code=204)
def delete_saved_search(
    saved_search_id: int,
    session: Session = Depends(get_session),
    user_id: int = Depends(current_user_id),
):
    saved = data.get_saved_search(session, saved_search_id)
    if saved is None:
        raise NotFoundError(f"saved search {saved_search_id} not found")
    if saved.owner_id != user_id:
        raise PermissionError("you do not own this saved search")
    data.delete_saved_search(session, saved)
    session.commit()
