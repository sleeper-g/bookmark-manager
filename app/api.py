from fastapi import Depends, FastAPI
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.middleware.cors import CORSMiddleware
from app.db import init_db
from app.config import DB_PATH
from app.db import AsyncSessionLocal
from app.models import (
    add_bookmark,
    delete_bookmark,
    get_all_bookmarks,
    search_bookmarks,
    update_bookmark,
)
from app.utils import fetch_title

app = FastAPI(title="Bookmark API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
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
    # Если заголовок не передан, пытаемся достать его из URL
    title = b.title or await fetch_title(b.url)
    # Вместо сырого SQL создаем объект
    new_obj = await add_bookmark(
        db,
        title = title,
        url = b.url,
        description = b.description,
        tags = b.tags
    )

    return {"status": "created", "id": new_obj.id, "title": title}


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

@app.on_event("startup")
async def on_startup():
    await init_db()
    print(f"Database connected at {DB_PATH}")