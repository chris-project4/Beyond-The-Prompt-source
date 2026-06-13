"""Data access for users. No raw SQL outside the data layer."""
from sqlalchemy.orm import Session

from app.models.user import User


def get_user(session: Session, user_id: int) -> User | None:
    return session.get(User, user_id)
