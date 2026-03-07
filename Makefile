.PHONY: install run test lint clean docker-build

# Установка окружения
install:
	uv sync

# Запуск API
run:
	uv run uvicorn app.api:app --reload --host 127.0.0.1 --port 8000

# Вызов: make cli args="list" | make cli args="add https://ya.ru" | make cli args="open 1"
cli:
	uv run bm $(args)

# Запуск тестов
test:
	uv run python -m app.test_models

# Проверка кода
lint:
	uv run ruff check app --fix
	uv run ruff format app

ui:
	cd frontend && npm run dev

dev:
	make -j2 run ui

# Очистка
clean:
	rm -rf .venv .ruff_cache .pytest_cache app/__pycache__
	find . -type d -name "__pycache__" -exec rm -rf {} +

# Сборка образа
build:
	podman build -t bookmark-app .

docker-up:
	docker-compose up --build -d

docker-down:
	docker-compose down
