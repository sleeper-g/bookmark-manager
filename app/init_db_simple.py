from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "bookmark.db"
DATABASE_URL = f"sqlite:///{DB_PATH}"

class Base(DeclarativeBase):
    pass

def run_init():  
    engine = create_engine(DATABASE_URL, echo=True)
    Base.metadata.create_all(engine)

if __name__ == "__main__":
    run_init()