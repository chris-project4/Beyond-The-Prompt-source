"""Shared API dependencies."""
from fastapi import Header
from sqlalchemy.orm import Session

from app.db import get_session  # re-exported for routers
from app.data.users import get_user
from app.errors import NotFoundError

__all__ = ["get_session", "current_user_id"]


def current_user_id(x_user_id: int = Header(default=1)) -> int:
    """Demo auth: the current user comes from the X-User-Id header
    (defaults to the seeded demo user). Real auth would replace this."""
    return x_user_id
