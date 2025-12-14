from db import init_db
from models import add_bookmark, get_all_bookmarks


def main():
    init_db()

    add_bookmark(
        title="Stack Overflow",
        url="https://stackoverflow.com",
        description="Вопросы и ответы для программистов",
        tags="python,programming",
    )

    bookmarks = get_all_bookmarks()
    for bm in bookmarks:
        print(bm)


if __name__ == "__main__":
    main()
