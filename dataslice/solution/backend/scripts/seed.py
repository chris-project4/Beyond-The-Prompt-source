"""Seed a demo user and some events so the app has data to search."""
import random
from datetime import datetime, timedelta

from app.db import SessionLocal, engine
from app.models.base import Base
from app.models import user, event, report, notification  # noqa: F401
try:
    from app.models import saved_search  # noqa: F401  (present on the solution branch)
except ImportError:
    pass
from app.models.user import User
from app.models.event import Event


def run():
    Base.metadata.create_all(engine)
    s = SessionLocal()
    if s.get(User, 1) is None:
        s.add(User(id=1, email="demo@dataslice.test", name="Demo User"))
    types = ["signup", "purchase", "login", "error"]
    sources = ["web", "ios", "android"]
    now = datetime.utcnow()
    for i in range(200):
        s.add(Event(
            occurred_at=now - timedelta(hours=random.randint(0, 240)),
            type=random.choice(types),
            source=random.choice(sources),
            value=round(random.uniform(0, 100), 2),
        ))
    s.commit()
    s.close()
    print("Seeded demo user and 200 events.")


if __name__ == "__main__":
    run()
