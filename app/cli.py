import asyncio
import typer
from typing import Optional
from app.db import AsyncSessionLocal
from app.models import add_bookmark, get_all_bookmarks, search_bookmarks

cli = typer.Typer(help="Bookmark Manager CLI")

@cli.command(name="list")
def list_bookmarks():
    """Показать все закладки"""
    async def _run():
        async with AsyncSessionLocal() as db:
            bookmarks = await get_all_bookmarks(db)
            if not bookmarks:
                typer.echo("Список пуст.")
                return
            for b in bookmarks:
                typer.echo(f"{b.id:3} | {b.title:30} | {b.url}")
    
    asyncio.run(_run())

@cli.command()
def add(
    url: str, 
    title: Optional[str] = typer.Option(None, "--title", "-t"),
    desc: str = typer.Option("", "--desc", "-d"),
    tags: str = typer.Option("", "--tags", "-g")
):
    """Добавить новую закладку"""
    async def _run():
        from app.utils import fetch_title # Импорт внутри, чтобы не тормозить запуск CLI
        async with AsyncSessionLocal() as db:
            final_title = title or await fetch_title(url)
            new_obj = await add_bookmark(db, title=final_title, url=url, description=desc, tags=tags)
            typer.secho(f"✅ Добавлено: {final_title} (ID: {new_obj.id})", fg=typer.colors.GREEN)
    
    asyncio.run(_run())

if __name__ == "__main__":
    cli()