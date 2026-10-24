from fastapi import APIRouter, Depends, HTTPException, Request, Header
from sqlalchemy.orm import Session
from database import get_db
from models import Admin
from schemas import LoginRequest, TokenResponse, PasswordResetRequest
from auth import create_access_token, hash_password, verify_password_or_dummy
import os
import time
import secrets
import collections
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

login_attempts = collections.defaultdict(list)
MAX_LOGIN_ATTEMPTS = 5
LOGIN_WINDOW_SECONDS = 60
# Periodically clean up stale entries to prevent memory leak
_last_cleanup = time.time()
CLEANUP_INTERVAL = 300  # 5 minutes

def _cleanup_login_attempts():
    """Remove stale entries from login_attempts to prevent memory leak."""
    global _last_cleanup
    now = time.time()
    if now - _last_cleanup < CLEANUP_INTERVAL:
        return
    _last_cleanup = now
    stale_ips = [
        ip for ip, attempts in login_attempts.items()
        if not attempts or (now - max(attempts)) > LOGIN_WINDOW_SECONDS
    ]
    for ip in stale_ips:
        del login_attempts[ip]

@router.post("/auth/login", response_model=TokenResponse)
def login(request: Request, login_req: LoginRequest, db: Session = Depends(get_db)):
    # Use X-Forwarded-For for real IP behind reverse proxy (Render/Vercel)
    ip = request.headers.get("X-Forwarded-For", request.client.host)
    if ip and "," in ip:
        ip = ip.split(",")[0].strip()  # First IP is the real client
    
    now = time.time()
    _cleanup_login_attempts()
    
    login_attempts[ip] = [t for t in login_attempts[ip] if now - t < LOGIN_WINDOW_SECONDS]
    
    if len(login_attempts[ip]) >= MAX_LOGIN_ATTEMPTS:
        raise HTTPException(status_code=429, detail="Too many login attempts. Please try again in 1 minute.")

    admin = db.query(Admin).filter(Admin.username == login_req.username).first()
    
    # Use timing-safe verification (always runs bcrypt even if user doesn't exist)
    password_valid = verify_password_or_dummy(
        login_req.password,
        admin.password_hash if admin else None
    )
    
    if not admin or not password_valid:
        login_attempts[ip].append(now)
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    if ip in login_attempts:
        del login_attempts[ip]
        
    token = create_access_token({"sub": admin.username})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/auth/setup")
def setup_admin(
    login_req: LoginRequest,
    x_setup_key: str = Header(None),
    db: Session = Depends(get_db)
):
    """One-time admin account creation. Requires SETUP_SECRET_KEY header."""
    setup_secret = os.getenv("SETUP_SECRET_KEY")
    
    # CRITICAL: Block if no secret key is configured (never allow unprotected setup)
    if not setup_secret:
        raise HTTPException(
            status_code=403,
            detail="Admin setup is disabled. Set SETUP_SECRET_KEY in your environment."
        )
    
    # Timing-safe comparison to prevent brute-force on the setup key
    if not x_setup_key or not secrets.compare_digest(x_setup_key, setup_secret):
        raise HTTPException(status_code=403, detail="Forbidden: Invalid setup key")

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

@router.post("/auth/reset-password")
def reset_admin_password(
    reset_req: PasswordResetRequest,
    x_setup_key: str = Header(None),
    db: Session = Depends(get_db)
):
    """Secure password reset using SETUP_SECRET_KEY."""
    setup_secret = os.getenv("SETUP_SECRET_KEY")
    if not setup_secret:
        raise HTTPException(
            status_code=403,
            detail="Admin reset is disabled. Set SETUP_SECRET_KEY in your environment."
        )

    if not x_setup_key or not secrets.compare_digest(x_setup_key, setup_secret):
        raise HTTPException(status_code=403, detail="Forbidden: Invalid setup key")

    admin = db.query(Admin).filter(Admin.username == reset_req.username).first()
    if not admin:
        admin = db.query(Admin).first()

    if not admin:
        admin = Admin(
            username=reset_req.username,
            password_hash=hash_password(reset_req.new_password)
        )
        db.add(admin)
        db.commit()
        return {"message": f"Admin account '{admin.username}' created successfully"}

    admin.password_hash = hash_password(reset_req.new_password)
    db.commit()
    return {"message": f"Password for '{admin.username}' reset successfully"}
