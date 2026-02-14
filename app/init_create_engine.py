import asyncio
from pathlib import Path

from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import DeclarativeBase

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "bookmark.db"

DATABASE_URL = f"sqlite+aiosqlite:///{DB_PATH}"
engine = create_async_engine(DATABASE_URL, echo=True)

class Base(DeclarativeBase):
    pass

async def run_init():
    print("Начинаю создание таблиц...")
    async with engine.begin() as conn:
        breakpoint()
        await conn.run_sync(Base.metadata.create_all)
    print("Готово! База создана.")

if __name__ == "__main__":
    asyncio.run(run_init())