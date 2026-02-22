import asyncio
from typing import List

from app.db import AsyncSessionLocal, Base, engine
from app.models import add_bookmark, get_all_bookmarks


async def test_single():
    """Базовый тест с одной закладкой"""
    # ШАГ 1: Гарантированно создаем таблицы перед тестом
    print("Проверяем/создаем таблицы...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # ШАГ 2: Работаем с данными
    # Открываем сессию вручную (в API это сделает FastAPI за нас)
    async with AsyncSessionLocal() as session:
        print("Добавляем закладку...")
        await add_bookmark(session, "Github", "https://github.com", "My profile")

        print("Читаем данные...")
        all_b = await get_all_bookmarks(session)
        for b in all_b:
            print(f"ID: {b.id}, Title: {b.title}")


async def test_multiple_concurrent():
    """Оптимизированный тест с параллельным добавлением нескольких закладок"""
    print("\n=== Тест с параллельным добавлением ===")
    
    # ШАГ 1: Создаем таблицы
    print("Проверяем/создаем таблицы...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # ШАГ 2: Добавляем несколько закладок параллельно
    async with AsyncSessionLocal() as session:
        print("Добавляем закладки параллельно...")
        
        bookmarks_data = [
            ("Github", "https://github.com", "My profile"),
            ("Google", "https://google.com", "Search engine"),
            ("Stack Overflow", "https://stackoverflow.com", "Q&A platform"),
        ]
        
        # Используем asyncio.gather для параллельного выполнения
        tasks = [
            add_bookmark(session, title, url, desc)
            for title, url, desc in bookmarks_data
        ]
        results = await asyncio.gather(*tasks)
        print(f"Добавлено {len(results)} закладок")

        print("Читаем все данные...")
        all_b = await get_all_bookmarks(session)
        for b in all_b:
            print(f"ID: {b.id}, Title: {b.title}, URL: {b.url}")


async def test_with_context_manager():
    """Тест с использованием контекстного менеджера для управления сессией"""
    print("\n=== Тест с контекстным менеджером ===")
    
    async def get_session():
        """Генератор для управления сессией"""
        async with AsyncSessionLocal() as session:
            yield session
    
    # ШАГ 1: Создаем таблицы
    print("Проверяем/создаем таблицы...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # ШАГ 2: Используем асинхронный контекстный менеджер
    async with AsyncSessionLocal() as session:
        print("Добавляем закладку...")
        await add_bookmark(session, "Reddit", "https://reddit.com", "Social news")

        print("Читаем данные...")
        all_b = await get_all_bookmarks(session)
        for b in all_b:
            print(f"ID: {b.id}, Title: {b.title}")


async def test_batch_operations():
    """Тест с пакетными операциями для лучшей производительности"""
    print("\n=== Тест с пакетными операциями ===")
    
    # ШАГ 1: Создаем таблицы
    print("Проверяем/создаем таблицы...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # ШАГ 2: Добавляем закладки в одной сессии
    async with AsyncSessionLocal() as session:
        print("Добавляем несколько закладок в одной сессии...")
        
        bookmarks_data = [
            ("Python.org", "https://python.org", "Official Python site"),
            ("FastAPI", "https://fastapi.tiangolo.com", "Modern web framework"),
            ("SQLAlchemy", "https://sqlalchemy.org", "SQL toolkit"),
        ]
        
        # Добавляем все объекты в сессию
        for title, url, desc in bookmarks_data:
            await add_bookmark(session, title, url, desc)
        
        print("Читаем все данные...")
        all_b = await get_all_bookmarks(session)
        print(f"Всего закладок: {len(all_b)}")
        for b in all_b:
            print(f"  - {b.title}: {b.url}")


async def main():
    """Главная функция для запуска всех тестов"""
    print("Запуск тестов asyncio оптимизации...\n")
    
    # Запускаем тесты последовательно
    await test_single()
    await test_multiple_concurrent()
    await test_with_context_manager()
    await test_batch_operations()
    
    print("\n✅ Все тесты завершены!")


if __name__ == "__main__":
    asyncio.run(main())
