from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Admin
from schemas import LoginRequest, TokenResponse
from auth import verify_password, create_access_token, hash_password
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

@router.post("/auth/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.username == request.username).first()
    if not admin or not verify_password(request.password, admin.password_hash):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    token = create_access_token({"sub": admin.username})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/auth/setup")
def setup_admin(request: LoginRequest, db: Session = Depends(get_db)):
    existing = db.query(Admin).first()
    if existing:
        raise HTTPException(status_code=400, detail="Admin already exists")
    admin = Admin(
        username=request.username,
        password_hash=hash_password(request.password)
    )
    db.add(admin)
    db.commit()
    return {"message": "Admin created successfully"}
