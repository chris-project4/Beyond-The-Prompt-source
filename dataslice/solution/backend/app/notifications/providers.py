"""Internal email provider abstraction. Only NotificationService calls this.
Never import or call it directly from feature code."""
import logging

from app.config import settings

logger = logging.getLogger("dataslice.email")


class EmailProvider:
    def send(self, to: str, subject: str, body: str) -> None:
        if not settings.EMAIL_ENABLED:
            logger.info("EMAIL (disabled) -> %s | %s", to, subject)
            return
        # Real integration would call the provider SDK here.
        logger.info("EMAIL -> %s | %s", to, subject)
