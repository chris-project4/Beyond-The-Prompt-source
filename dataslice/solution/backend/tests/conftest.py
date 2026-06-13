"""Test fixtures: in-memory SQLite, dependency override, a seeded user."""
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient

from app.models.base import Base
from app.models import user, event, report, notification  # noqa: F401
try:
    from app.models import saved_search  # noqa: F401  (present on the solution branch)
except ImportError:
    pass
from app.models.user import User


@pytest.fixture()
def session():
    engine = create_engine("sqlite://", connect_args={"check_same_thread": False})
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine, expire_on_commit=False, future=True)
    s = Session()
    s.add(User(id=1, email="demo@dataslice.test", name="Demo User"))
    s.commit()
    try:
        yield s
    finally:
        s.close()


@pytest.fixture()
def client(session):
    from app.main import app
    from app.api.deps import get_session
    app.dependency_overrides[get_session] = lambda: session
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()
