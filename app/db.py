from datetime import datetime

from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from app.config import DB_PATH
import logging

# Создаем движок. sqlite+aiosqlite говорит, что работаем асинхронно
DATABASE_URL = f"sqlite+aiosqlite:///{DB_PATH}"
#engine = create_async_engine(DATABASE_URL)
# отладка
engine = create_async_engine(DATABASE_URL, echo=False)

# Логи: время - имя логгера - уровень - сообщение
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%H:%M:%S",
)

# Фабрика сессий (как раз то, через что будем делать запросы)
AsyncSessionLocal = async_sessionmaker(bind=engine, expire_on_commit=False)

class Base(DeclarativeBase):
    pass

# Теперь таблица — это класс
class Bookmark(Base):
    __tablename__ = "bookmarks"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(nullable=False)
    url: Mapped[str] = mapped_column(unique=True, nullable=False)
    description: Mapped[str | None]
    tags: Mapped[str | None]
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
