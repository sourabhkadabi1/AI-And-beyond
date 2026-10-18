from pydantic import BaseModel, Field, field_validator
from datetime import datetime
from typing import Optional, List
import re

class PostCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    slug: str = Field(..., min_length=1, max_length=200)
    content: str = Field(..., min_length=1, max_length=500000)
    excerpt: Optional[str] = Field(None, max_length=500)
    category: str = Field(..., min_length=1, max_length=50)
    cover_image: Optional[str] = Field(None, max_length=2000)
    video_url: Optional[str] = Field(None, max_length=500)
    pinterest_desc: Optional[str] = Field(None, max_length=500)
    meta_desc: Optional[str] = Field(None, max_length=160)
    tags: Optional[str] = Field(None, max_length=500)
    is_published: bool = True

    @field_validator('slug')
    @classmethod
    def validate_slug(cls, v):
        if not re.match(r'^[a-z0-9]+(?:-[a-z0-9]+)*$', v):
            raise ValueError('Slug must be lowercase alphanumeric with hyphens only')
        return v

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
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8, max_length=72)  # bcrypt max is 72 bytes

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class ImageUploadResponse(BaseModel):
    url: str
    public_id: str

class SubscriberCreate(BaseModel):
    email: str = Field(..., min_length=5, max_length=254)

    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        v = v.strip().lower()
        if not re.match(r'^[^@\s]+@[^@\s]+\.[^@\s]+$', v):
            raise ValueError('Invalid email address')
        return v

class SubscriberOut(BaseModel):
    id: int
    email: str
    created_at: datetime

    class Config:
        from_attributes = True
