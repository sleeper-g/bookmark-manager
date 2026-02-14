.PHONY: install run test lint clean docker-build

# Установка окружения
install:
	uv sync

# Запуск API
run:
	uv run uvicorn app.api:app --reload --host 127.0.0.1 --port 8000

# Запуск тестов (без .py в конце!)
test:
	uv run python -m app.test_models

# Проверка кода
lint:
	uv run ruff check app --fix
	uv run ruff format app

# Очистка
clean:
	rm -rf .venv .ruff_cache .pytest_cache app/__pycache__
	find . -type d -name "__pycache__" -exec rm -rf {} +

# Сборка образа
build:
	podman build -t bookmark-app .