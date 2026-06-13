from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class SavedSearchCreate(BaseModel):
    name: str
    query_spec: dict = {}


class SavedSearchOut(BaseModel):
    id: int
    name: str
    owner_id: int
    query_spec: dict
    last_run_at: Optional[datetime]
    created_at: datetime

    model_config = {"from_attributes": True}
