from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class PostCreate(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: Optional[str] = None
    category: str
    cover_image: Optional[str] = None
    video_url: Optional[str] = None
    pinterest_desc: Optional[str] = None
    meta_desc: Optional[str] = None
    tags: Optional[str] = None
    is_published: bool = True

class PostUpdate(PostCreate):
    pass

class PostOut(BaseModel):
    id: int
    title: str
    slug: str
    content: str
    excerpt: Optional[str]
    category: str
    cover_image: Optional[str]
    video_url: Optional[str]
    pinterest_desc: Optional[str]
    meta_desc: Optional[str]
    tags: Optional[str]
    is_published: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class PostSummary(BaseModel):
    id: int
    title: str
    slug: str
    excerpt: Optional[str]
    category: str
    cover_image: Optional[str]
    tags: Optional[str]
    is_published: bool
    created_at: datetime

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class ImageUploadResponse(BaseModel):
    url: str
    public_id: str

class SubscriberCreate(BaseModel):
    email: str

class SubscriberOut(BaseModel):
    id: int
    email: str
    created_at: datetime

    class Config:
        from_attributes = True
