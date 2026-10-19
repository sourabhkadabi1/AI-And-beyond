import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

raw_url = os.getenv("DATABASE_URL")
if not raw_url or not raw_url.strip():
    DATABASE_URL = "sqlite:///./aiandbeyond.db"
else:
    DATABASE_URL = raw_url.strip()
    # Strip any accidental 'psql ' prefix if copied from Neon CLI snippet
    if DATABASE_URL.startswith("psql "):
        DATABASE_URL = DATABASE_URL[5:].strip()
    # Strip surrounding single or double quotes
    DATABASE_URL = DATABASE_URL.strip("'\"")
    # Fix legacy postgres:// prefix (Render or Heroku)
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg2://", 1)
    # Ensure we explicitly use psycopg2 driver (not psycopg v3)
    elif DATABASE_URL.startswith("postgresql://"):
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg2://", 1)

connect_args = {}
engine_kwargs = {}

if DATABASE_URL.startswith("sqlite"):
    connect_args["check_same_thread"] = False
else:
    # Automatically verify connection health (crucial for Neon serverless sleeping)
    engine_kwargs["pool_pre_ping"] = True
    engine_kwargs["pool_recycle"] = 300

engine = create_engine(DATABASE_URL, connect_args=connect_args, **engine_kwargs)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
