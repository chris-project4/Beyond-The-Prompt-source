.PHONY: dev test migrate seed install

install:
	pip install -r requirements.txt

dev:
	uvicorn app.main:app --reload

test:
	pytest -q

seed:
	python -m scripts.seed

migrate:
	alembic upgrade head
