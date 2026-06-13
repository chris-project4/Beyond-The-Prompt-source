"""Search API. Runs a query through SearchQuery (never ad-hoc search)."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_session
from app.schemas.search import SearchRequest, EventOut
from app.search.query import SearchQuery
from app.validation.validators import validate_query_spec

router = APIRouter(prefix="/api/search", tags=["search"])


@router.post("", response_model=list[EventOut])
def run_search(payload: SearchRequest, session: Session = Depends(get_session)):
    spec = validate_query_spec(payload.query_spec)
    return SearchQuery(session).run(spec)
