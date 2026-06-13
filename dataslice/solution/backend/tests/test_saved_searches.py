"""Acceptance scenarios for Saved Searches with Alerts, encoded as tests."""
from datetime import datetime, timedelta

from app.models.event import Event
from app.models.notification import Notification
from app.models.saved_search import SavedSearch
from app.services.saved_search_service import evaluate_saved_search


def _saved(session, last_run_at):
    s = SavedSearch(owner_id=1, name="Big purchases", query_spec={"types": ["purchase"]},
                    last_run_at=last_run_at)
    session.add(s)
    session.flush()
    return s


def _event(session, when, type_="purchase"):
    session.add(Event(occurred_at=when, type=type_, source="web", value=1.0))
    session.flush()


def _notifications(session):
    return session.query(Notification).all()


def test_new_results_since_last_run_notifies_once(session):
    base = datetime(2026, 1, 1, 12, 0, 0)
    saved = _saved(session, last_run_at=base)
    _event(session, base + timedelta(hours=1))
    _event(session, base + timedelta(hours=2))

    count = evaluate_saved_search(session, saved.id)

    assert count == 2
    assert len(_notifications(session)) == 1          # notified ONCE, not per result
    assert saved.last_run_at > base                    # advanced


def test_no_new_results_does_not_notify(session):
    base = datetime(2026, 1, 1, 12, 0, 0)
    saved = _saved(session, last_run_at=base)
    _event(session, base - timedelta(hours=1))         # older than last_run_at

    count = evaluate_saved_search(session, saved.id)

    assert count == 0
    assert len(_notifications(session)) == 0
    assert saved.last_run_at > base                    # still advanced


def test_first_ever_evaluation_does_not_notify_for_history(session):
    saved = _saved(session, last_run_at=None)
    _event(session, datetime(2026, 1, 1, 12, 0, 0))    # pre-existing result

    count = evaluate_saved_search(session, saved.id)

    assert count == 0                                  # history does not trigger
    assert len(_notifications(session)) == 0
    assert saved.last_run_at is not None               # baseline established


def test_saved_search_is_private_to_its_owner(client):
    # User 1 creates a saved search.
    resp = client.post(
        "/api/saved-searches",
        json={"name": "Mine", "query_spec": {"types": ["purchase"]}},
        headers={"X-User-Id": "1"},
    )
    assert resp.status_code == 201
    ss_id = resp.json()["id"]

    # User 2 never sees it, and cannot evaluate or delete it.
    assert client.get("/api/saved-searches", headers={"X-User-Id": "2"}).json() == []
    assert client.post(f"/api/saved-searches/{ss_id}/evaluate", headers={"X-User-Id": "2"}).status_code == 403
    assert client.delete(f"/api/saved-searches/{ss_id}", headers={"X-User-Id": "2"}).status_code == 403

    # The owner still has exactly one.
    assert len(client.get("/api/saved-searches", headers={"X-User-Id": "1"}).json()) == 1
