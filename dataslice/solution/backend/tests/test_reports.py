def test_create_and_list_report(client):
    resp = client.post("/api/reports", json={"name": "Signups", "query_spec": {"types": ["signup"]}})
    assert resp.status_code == 201
    assert resp.json()["name"] == "Signups"

    resp = client.get("/api/reports")
    assert resp.status_code == 200
    assert len(resp.json()) == 1


def test_create_report_rejects_blank_name(client):
    resp = client.post("/api/reports", json={"name": "  ", "query_spec": {}})
    assert resp.status_code == 422
    assert resp.json()["error"]["code"] == "validation_error"
