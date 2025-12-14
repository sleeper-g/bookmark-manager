from fastapi import FastAPI
from pydantic import BaseModel

from db import init_db
from models import (
    add_bookmark,
    delete_bookmark,
    get_all_bookmarks,
    search_bookmarks,
    update_bookmark,
)

app = FastAPI(title="Bookmark API")
init_db()


class Bookmark(BaseModel):
    title: str
    url: str
    description: str = ""
    tags: str = ""


@app.post("/bookmark")
def create(b: Bookmark):
    add_bookmark(b.title, b.url, b.description, b.tags)
    return {"status": "created"}


@app.get("/bookmarks")
def list_all():
    return get_all_bookmarks()


@app.get("/search")
def search(q: str):
    return search_bookmarks(q)


@app.delete("/bookmarks/{bookmark_id}")
def delete(bookmark_id: int):
    delete_bookmark(bookmark_id)
    return {"status": "deleted"}


@app.put("/bookmarks/{bookmark_id}")
def update(bookmark_id: int, b: Bookmark):
    update_bookmark(bookmark_id, b.title, b.url, b.description, b.tags)
    return {"status": "updated"}
