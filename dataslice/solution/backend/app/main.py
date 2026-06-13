"""DataSlice API entry point."""
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.db import engine
from app.errors import AppError, app_error_handler
from app.models.base import Base
# Import models so their tables register on Base.metadata.
from app.models import user, event, report, notification  # noqa: F401
from app.api import reports, search
from app.worker.jobs import register_jobs

logging.basicConfig(level=logging.INFO)

app = FastAPI(title="DataSlice", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_exception_handler(AppError, app_error_handler)

app.include_router(reports.router)
app.include_router(search.router)

# Saved Searches with Alerts registers its router here when present.
try:
    from app.api import saved_searches
    app.include_router(saved_searches.router)
except ImportError:
    pass


@app.on_event("startup")
def on_startup():
    if settings.AUTO_CREATE:
        Base.metadata.create_all(bind=engine)
    register_jobs()


@app.get("/api/health")
def health():
    return {"status": "ok"}
