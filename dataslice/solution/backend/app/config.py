"""Application settings. SQLite by default so the app runs with no setup;
point DATABASE_URL at Postgres for production."""
import os


class Settings:
    DATABASE_URL: str = os.environ.get("DATABASE_URL", "sqlite:///./dataslice.db")
    # In dev we create tables on startup; in production run `make migrate`.
    AUTO_CREATE: bool = os.environ.get("DATASLICE_AUTO_CREATE", "1") == "1"
    EMAIL_ENABLED: bool = os.environ.get("DATASLICE_EMAIL_ENABLED", "0") == "1"


settings = Settings()
