from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from database import get_db
from models import Admin
from schemas import LoginRequest, TokenResponse
from auth import verify_password, create_access_token, hash_password
import os
import time
import collections
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

login_attempts = collections.defaultdict(list)

@router.post("/auth/login", response_model=TokenResponse)
def login(request: Request, login_req: LoginRequest, db: Session = Depends(get_db)):
    ip = request.client.host
    now = time.time()
    
    login_attempts[ip] = [attempt_time for attempt_time in login_attempts[ip] if now - attempt_time < 60]
    
    if len(login_attempts[ip]) >= 5:
        raise HTTPException(status_code=429, detail="Too many login attempts. Please try again in 1 minute.")

    admin = db.query(Admin).filter(Admin.username == login_req.username).first()
    if not admin or not verify_password(login_req.password, admin.password_hash):
        login_attempts[ip].append(now)
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    if ip in login_attempts:
        del login_attempts[ip]
        
    token = create_access_token({"sub": admin.username})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/auth/setup")
def setup_admin(login_req: LoginRequest, secret_key: str = None, db: Session = Depends(get_db)):
    setup_secret = os.getenv("SETUP_SECRET_KEY")
    if setup_secret and secret_key != setup_secret:
        raise HTTPException(status_code=403, detail="Forbidden: Invalid setup secret key")

    existing = db.query(Admin).first()
    if existing:
        raise HTTPException(status_code=400, detail="Admin already exists")
    admin = Admin(
        username=login_req.username,
        password_hash=hash_password(login_req.password)
    )
    db.add(admin)
    db.commit()
    return {"message": "Admin created successfully"}
