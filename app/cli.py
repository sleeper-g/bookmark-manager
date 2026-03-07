import asyncio
import webbrowser

import typer
from typing import Optional

from app.db import AsyncSessionLocal
from app.models import (
    add_bookmark,
    get_all_bookmarks,
    get_bookmark_by_id,
    search_bookmarks,
)

cli = typer.Typer(
    name="bm",
    help="Bookmark Manager: bm list | bm add <url> | bm open <id> | bm search <query>",
    no_args_is_help=True,
)

@cli.command(name="list")
def list_bookmarks(
    limit: Optional[int] = typer.Option(None, "--limit", "-n", help="Макс. число строк"),
):
    """Показать все закладки."""
    async def _run():
        async with AsyncSessionLocal() as db:
            bookmarks = await get_all_bookmarks(db)
            if not bookmarks:
                typer.echo("Список пуст.")
                return
            if limit:
                bookmarks = bookmarks[:limit]
            for b in bookmarks:
                typer.echo(f"{b.id:3} | {b.title[:30]:30} | {b.url}")

    asyncio.run(_run())


@cli.command()
def add(
    url: str,
    title: Optional[str] = typer.Option(None, "--title", "-t"),
    desc: str = typer.Option("", "--desc", "-d"),
    tags: str = typer.Option("", "--tags", "-g"),
):
    """Добавить закладку: bm add https://example.com."""
    async def _run():
        from app.utils import fetch_title

        async with AsyncSessionLocal() as db:
            final_title = title or await fetch_title(url)
            new_obj = await add_bookmark(
                db, title=final_title, url=url, description=desc, tags=tags
            )
            typer.secho(
                f"✅ Добавлено: {final_title} (ID: {new_obj.id})",
                fg=typer.colors.GREEN,
            )

    asyncio.run(_run())


@cli.command(name="open")
def open_bookmark(id: int):
    """Открыть закладку в браузере по ID: bm open 1."""
    async def _run():
        async with AsyncSessionLocal() as db:
            target = await get_bookmark_by_id(db, id)
            if target:
                webbrowser.open(target.url)
                typer.secho(f"Открыто: {target.title}", fg=typer.colors.GREEN)
            else:
                typer.echo("Закладка с таким ID не найдена.")

    asyncio.run(_run())


@cli.command(name="search")
def search(query: str):
    """Поиск по названию, URL и тегам: bm search python."""
    async def _run():
        async with AsyncSessionLocal() as db:
            bookmarks = await search_bookmarks(db, query)
            if not bookmarks:
                typer.echo("Ничего не найдено.")
                return
            for b in bookmarks:
                typer.echo(f"{b.id:3} | {b.title[:30]:30} | {b.url}")

    asyncio.run(_run())


if __name__ == "__main__":
    cli()