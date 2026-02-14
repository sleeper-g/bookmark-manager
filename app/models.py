from sqlalchemy import delete, or_, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import Bookmark


async def add_bookmark(session: AsyncSession, title: str, url: str, 
                       description: str | None = "", tags: str | None = ""):
    new_bookmark = Bookmark(
        title=title,
        url=url,
        description=description,
        tags=tags
    )
    session.add(new_bookmark)
    await session.commit()
    # После коммита id запоминается автоматически
    return new_bookmark


async def get_all_bookmarks(session: AsyncSession):
    # В SQLAlchemy 2.0 мы используем select()
    result = await session.execute(select(Bookmark))
    # .scalars() превращает строки БД в объекты класса Bookmark
    return result.scalars().all()

async def delete_bookmark(session: AsyncSession, bookmark_id: int):
    # Мы можем просто найти объект и удалить его, либо использовать delete()
    stmt = delete(Bookmark).where(Bookmark.id == bookmark_id)
    await session.execute(stmt)
    await session.commit()

async def search_bookmarks(session: AsyncSession, query: str):
    search_filter = f"%{query}%"
    # or_ - это логическое ИЛИ
    stmt = select(Bookmark).where(
        or_(
            Bookmark.title.ilike(search_filter), # ilike - регистронезависимый поиск
            Bookmark.url.ilike(search_filter),
            Bookmark.tags.ilike(search_filter)
        )
    )
    result = await session.execute(stmt)
    return result.scalars().all()

async def update_bookmark(session: AsyncSession, bookmark_id: int, **kwargs):
    # kwargs позволяет передавать только те поля, которые нужно обновить
    # Убираем None значения, чтобы не затереть данные в базе
    update_data = {k: v for k, v in kwargs.items() if v is not None}

    if not update_data:
        return
    
    stmt = update(Bookmark).where(Bookmark.id == bookmark_id).values(**update_data)
    await session.execute(stmt)
    await session.commit()
