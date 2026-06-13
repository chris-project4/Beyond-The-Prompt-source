"""Shared validators reused across features. Validate here, not inline."""
from app.errors import ValidationError

ALLOWED_SPEC_KEYS = {"types", "sources", "min_value", "since", "until"}


def validate_name(name: str) -> str:
    name = (name or "").strip()
    if not name:
        raise ValidationError("name is required")
    if len(name) > 200:
        raise ValidationError("name must be 200 characters or fewer")
    return name


def validate_query_spec(spec: dict) -> dict:
    if not isinstance(spec, dict):
        raise ValidationError("query_spec must be an object")
    unknown = set(spec) - ALLOWED_SPEC_KEYS
    if unknown:
        raise ValidationError(f"unknown query_spec keys: {', '.join(sorted(unknown))}")
    for key in ("types", "sources"):
        if key in spec and not isinstance(spec[key], list):
            raise ValidationError(f"{key} must be a list")
    return spec
