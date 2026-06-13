from datetime import datetime

from sqlalchemy import String, DateTime, Float
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class Event(Base):
    """A single analytics event. DataSlice's core data; searches run over this."""
    __tablename__ = "events"

    id: Mapped[int] = mapped_column(primary_key=True)
    occurred_at: Mapped[datetime] = mapped_column(DateTime, index=True)
    type: Mapped[str] = mapped_column(String(100), index=True)
    source: Mapped[str] = mapped_column(String(100), index=True)
    value: Mapped[float] = mapped_column(Float, default=0.0)
