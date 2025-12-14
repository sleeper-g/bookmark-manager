from db import get_connection


def add_bookmark(title, url, description="", tags=""):
    with get_connection() as conn:
        conn.execute(
            "INSERT INTO bookmarks (title, url, description, tags) VALUES (?, ?, ?, ?)",
            (title, url, description, tags),
        )
        conn.commit()


def get_all_bookmarks():
    with get_connection() as conn:
        return conn.execute(
            "SELECT id, title, url, description, tags, created_at FROM bookmarks"
        ).fetchall()


def delete_bookmark(bookmark_id: int):
    with get_connection() as conn:
        conn.execute("DELETE FROM bookmarks WHERE id = ?", (bookmark_id,))
        conn.commit()


def update_bookmark(bookmark_id, title=None, url=None, description=None, tags=None):
    fields = []
    values = []
    for name, value in {
        "title": title,
        "url": url,
        "description": description,
        "tags": tags,
    }.items():
        if value is not None:
            fields.append(f"{name} = ?")
            values.append(value)

    if not fields:
        return

    values.append(bookmark_id)

    with get_connection() as conn:
        conn.execute(
            f"UPDATE bookmarks SET {', '.join(fields)} WHERE id = ?",
            values,
        )
        conn.commit()


def search_bookmarks(query: str):
    q = f"%{query}%"
    with get_connection() as conn:
        return conn.execute(
            """
            SELECT id, title, url, description, tags, created_at
            FROM bookmarks
            WHERE title LIKE ? OR url LIKE ? OR tags LIKE ?
            """,
            (q, q, q),
        ).fetchall()
