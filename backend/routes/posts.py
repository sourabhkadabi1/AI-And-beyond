from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import get_db
from models import Post
from schemas import PostCreate, PostUpdate, PostOut, PostSummary
from auth import get_current_admin
from typing import List, Optional

router = APIRouter()

@router.get("/posts", response_model=List[PostSummary])
def get_posts(
    category: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = Query(default=12, le=50),
    offset: int = 0,
    db: Session = Depends(get_db)
):
    query = db.query(Post).filter(Post.is_published == True)
    if category:
        query = query.filter(Post.category == category)
    if search:
        query = query.filter(Post.title.ilike(f"%{search}%"))
    return query.order_by(Post.created_at.desc()).offset(offset).limit(limit).all()

@router.get("/posts/{slug}", response_model=PostOut)
def get_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.slug == slug, Post.is_published == True).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.get("/admin/posts", response_model=List[PostSummary])
def get_all_posts_admin(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    return db.query(Post).order_by(Post.created_at.desc()).all()

@router.post("/admin/posts", response_model=PostOut)
def create_post(post: PostCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    existing = db.query(Post).filter(Post.slug == post.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
    db_post = Post(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@router.put("/admin/posts/{id}", response_model=PostOut)
def update_post(id: int, post: PostUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_post = db.query(Post).filter(Post.id == id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    for key, value in post.dict().items():
        setattr(db_post, key, value)
    db.commit()
    db.refresh(db_post)
    return db_post

@router.delete("/admin/posts/{id}")
def delete_post(id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_post = db.query(Post).filter(Post.id == id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(db_post)
    db.commit()
    return {"message": "Post deleted successfully"}
