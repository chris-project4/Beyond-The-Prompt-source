from datetime import datetime
from pydantic import BaseModel


class SearchRequest(BaseModel):
    query_spec: dict = {}


class EventOut(BaseModel):
    id: int
    occurred_at: datetime
    type: str
    source: str
    value: float

    model_config = {"from_attributes": True}
