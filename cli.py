import argparse

from db import init_db
from models import (
    add_bookmark,
    delete_bookmark,
    get_all_bookmarks,
    search_bookmarks,
    update_bookmark,
)


def main():
    init_db()

    parser = argparse.ArgumentParser(description="Менеджер закладок (CLI)")
    sub = parser.add_subparsers(dest="command")

    add = sub.add_parser("add")
    add.add_argument("title")
    add.add_argument("url")
    add.add_argument("--desc", default="")
    add.add_argument("--tags", default="")

    delete = sub.add_parser("delete")
    delete.add_argument("id", type=int)

    update = sub.add_parser("update")
    update.add_argument("id", type=int)
    update.add_argument("--title")
    update.add_argument("--url")
    update.add_argument("--desc")
    update.add_argument("--tags")

    search = sub.add_parser("search")
    search.add_argument("query")

    list_cmd = sub.add_parser("list")
    list_cmd.add_argument("--tag")

    args = parser.parse_args()

    if args.command == "add":
        add_bookmark(args.title, args.url, args.desc, args.tags)
        print("Добавлено")
    elif args.command == "delete":
        delete_bookmark(args.id)
        print("Удалено")
    elif args.command == "update":
        update_bookmark(args.id, args.title, args.url, args.desc, args.tags)
        print("Обновлено")
    elif args.command == "search":
        for b in search_bookmarks(args.query):
            print(b)
    elif args.command == "list":
        for b in get_all_bookmarks():
            print(b)


if __name__ == "__main__":
    main()
