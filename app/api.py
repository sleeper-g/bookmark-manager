from fastapi import Depends, FastAPI
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import AsyncSessionLocal
from app.models import (
    add_bookmark,
    delete_bookmark,
    get_all_bookmarks,
    search_bookmarks,
    update_bookmark,
)

app = FastAPI(title="Bookmark API")

class BookmarkCreate(BaseModel):
    title: str
    url: str
    description: str | None = None
    tags: str | None = None

# Функция-зависимость: открывает сессию и закрывает её после запроса
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@app.post("/bookmark")
async def create(b: BookmarkCreate, db: AsyncSession = Depends(get_db)):
    # Вместо сырого SQL создаем объект
    new_obj = await add_bookmark(
        db,
        title = b.title,
        url = b.url,
        description = b.description,
        tags = b.tags
    )

    return {"status": "created", "id": new_obj.id}


@app.get("/bookmarks")
async def list_all(db: AsyncSession = Depends(get_db)):
    # FastApi вызывает get_db и дает переменную db
    bookmark = await get_all_bookmarks(db)
    return bookmark


@app.get("/search")
async def search(query: str ,db: AsyncSession = Depends(get_db)):
    bookmark = await search_bookmarks(db, query)
    return bookmark


@app.delete("/bookmarks/{bookmark_id}")
async def delete(bookmark_id: int, db: AsyncSession = Depends(get_db)):
    await delete_bookmark(db, bookmark_id)
    return {"status": "deleted"}


@app.put("/bookmarks/{bookmark_id}")
async def update(bookmark_id: int, b: BookmarkCreate, 
                 db: AsyncSession = Depends(get_db)):
    # b.model_dump() превращает Pydantic модель в обычный словарь {key: value}
    # Мы распаковываем его через **kwargs в твою функцию models.update_bookmark
    await update_bookmark(db, bookmark_id, **b.model_dump())
    return {"status": "updated"}
