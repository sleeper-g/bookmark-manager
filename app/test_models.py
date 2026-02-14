import asyncio

from app.db import AsyncSessionLocal, Base, engine
from app.models import add_bookmark, get_all_bookmarks


async def test():
    # ШАГ 1: Гарантированно создаем таблицы перед тестом
    print("Проверяем/создаем таблицы...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # ШАГ 2: Работаем с данными
    # Открываем сессию вручную (в API это сделает FastAPI за нас)
    async with AsyncSessionLocal() as session:
        print("Добавляем закладку...")
        await add_bookmark(session, "Github", "https://github.com", "My profile", )

        print("Читаем данные...")
        all_b = await get_all_bookmarks(session)
        for b in all_b:
            print(f"ID: {b.id}, Title: {b.title}")

if __name__ == "__main__":
    asyncio.run(test())