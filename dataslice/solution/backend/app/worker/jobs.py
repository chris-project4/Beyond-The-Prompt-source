"""Registers background jobs on the shared worker. The saved-search
evaluation job is registered here when that feature is present."""
from app.worker.worker import worker


def register_jobs() -> None:
    try:
        # Present only once Saved Searches with Alerts is implemented.
        from app.services.saved_search_service import evaluate_all_saved_searches
        worker.register_periodic(
            "evaluate_saved_searches", evaluate_all_saved_searches, interval_seconds=300
        )
    except ImportError:
        pass
