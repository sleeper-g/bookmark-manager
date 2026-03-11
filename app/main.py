"""
Точка входа для production: монтирует API по префиксу (например /bookmark-manager/api),
если задана переменная окружения API_PATH_PREFIX.
"""
import os

from fastapi import FastAPI

from app.api import app as api_app

API_PATH_PREFIX = os.getenv("API_PATH_PREFIX", "").rstrip("/")

if API_PATH_PREFIX:
    root = FastAPI(title="Bookmark Manager")
    root.mount(API_PATH_PREFIX, api_app)
    app = root
else:
    app = api_app
