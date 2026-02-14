FROM python:3.13-slim
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
# Добавляем .venv в PATH, чтобы uvicorn был доступен напрямую
ENV PATH="/app/.venv/bin:$PATH"

WORKDIR /app

# Копируем только файлы зависимостей для кэширования слоев
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

# Копируем остальное
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.api:app", "--host", "0.0.0.0", "--port", "8000"]