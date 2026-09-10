from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from datetime import datetime
from database import Base

class Post(Base):
    __tablename__ = "posts"

    id            = Column(Integer, primary_key=True, index=True)
    title         = Column(String(200), nullable=False)
    slug          = Column(String(200), unique=True, nullable=False)
    content       = Column(Text, nullable=False)
    excerpt       = Column(String(400), nullable=True)
    category      = Column(String(100), nullable=False)
    cover_image   = Column(String(500), nullable=True)
    video_url     = Column(String(500), nullable=True)
    pinterest_desc= Column(String(500), nullable=True)
    meta_desc     = Column(String(200), nullable=True)
    tags          = Column(String(300), nullable=True)
    is_published  = Column(Boolean, default=True)
    created_at    = Column(DateTime, default=datetime.utcnow)
    updated_at    = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Admin(Base):
    __tablename__ = "admins"

    id            = Column(Integer, primary_key=True, index=True)
    username      = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(200), nullable=False)

class Subscriber(Base):
    __tablename__ = "subscribers"

    id            = Column(Integer, primary_key=True, index=True)
    email         = Column(String(255), unique=True, index=True, nullable=False)
    created_at    = Column(DateTime, default=datetime.utcnow)
