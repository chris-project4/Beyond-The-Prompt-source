from datetime import datetime
from pydantic import BaseModel


class ReportCreate(BaseModel):
    name: str
    query_spec: dict = {}


class ReportOut(BaseModel):
    id: int
    name: str
    owner_id: int
    query_spec: dict
    created_at: datetime

    model_config = {"from_attributes": True}
