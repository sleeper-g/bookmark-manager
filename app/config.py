import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
# В Docker задай DATABASE_URL, иначе используется локальный файл
_DB_URL = os.getenv("DATABASE_URL")
if _DB_URL:
    DATABASE_URL = _DB_URL
else:
    DB_PATH = BASE_DIR / "bookmark.db"
    DATABASE_URL = f"sqlite+aiosqlite:///{DB_PATH}"
