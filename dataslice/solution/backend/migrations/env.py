from alembic import context
from sqlalchemy import engine_from_config, pool

from app.config import settings
from app.models.base import Base
# Import models so their tables are visible to autogenerate.
from app.models import user, event, report, notification  # noqa: F401
try:
    from app.models import saved_search  # noqa: F401  (present on the solution branch)
except ImportError:
    pass

config = context.config
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)
target_metadata = Base.metadata


def run_migrations_offline():
    context.configure(url=settings.DATABASE_URL, target_metadata=target_metadata, literal_binds=True)
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section), prefix="sqlalchemy.", poolclass=pool.NullPool
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
