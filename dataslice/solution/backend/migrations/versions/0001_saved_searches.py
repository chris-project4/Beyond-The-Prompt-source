"""Add saved_searches table

Revision ID: 0001_saved_searches
Revises:
"""
from alembic import op
import sqlalchemy as sa

revision = "0001_saved_searches"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "saved_searches",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(length=200), nullable=False),
        sa.Column("owner_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False, index=True),
        sa.Column("query_spec", sa.JSON(), nullable=False),
        sa.Column("last_run_at", sa.DateTime(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )


def downgrade():
    op.drop_table("saved_searches")
