# Bookmark Manager API

Асинхронный менеджер закладок на FastAPI и SQLAlchemy 2.0.

## Фичи

Полная асинхронность: Используется aiosqlite и AsyncSession.

Современный стек: uv для управления зависимостями, ruff для линтинга.

Docker-ready: Проект полностью контейнеризирован.

Авто-документация: Swagger UI доступен сразу после запуска.

## Как запустить

Требования: uv или docker/podman.

Клонируйте репозиторий:

```bash
git clone https://github.com/sleeper-g/bookmark-manager
cd bookmark-manager
```

Запуск через Makefile (рекомендуется):

```bash
make install
make run
```

Запуск через Docker:

```bash
make build
make docker-up
```

## API Endpoints
После запуска перейдите на http://127.0.0.1:8000/docs для доступа к интерактивной документации.

GET /bookmarks — список всех закладок.

POST /bookmark — добавить новую.

PUT /bookmarks/{id} — обновить данные.

DELETE /bookmarks/{id} — удалить.

## Структура проекта

app/ — основной код приложения.
models.py — CRUD операции и бизнес-логика.
db.py — настройка базы данных и моделей SQLAlchemy.
api.py — эндпоинты FastAPI.