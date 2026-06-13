"""NotificationService: the single entry point for notifying a user.

Sends both the in-app notification and the email. Never call the email
provider directly from feature code; always go through this service.
"""
from sqlalchemy.orm import Session

from app.models.notification import Notification
from app.models.user import User
from app.notifications.providers import EmailProvider
from app.errors import NotFoundError


class NotificationService:
    def __init__(self, session: Session, email: EmailProvider | None = None):
        self.session = session
        self.email = email or EmailProvider()

    def send(self, user_id: int, subject: str, body: str) -> Notification:
        user = self.session.get(User, user_id)
        if user is None:
            raise NotFoundError(f"user {user_id} not found")
        note = Notification(user_id=user_id, subject=subject, body=body)
        self.session.add(note)
        self.session.flush()
        self.email.send(to=user.email, subject=subject, body=body)
        return note
