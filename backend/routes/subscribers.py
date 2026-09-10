from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import Subscriber
from schemas import SubscriberCreate, SubscriberOut
from auth import get_current_admin
from typing import List
import re

router = APIRouter()

EMAIL_REGEX = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"

@router.post("/subscribers", status_code=status.HTTP_201_CREATED)
def subscribe(payload: SubscriberCreate, db: Session = Depends(get_db)):
    clean_email = payload.email.strip().lower()
    if not re.match(EMAIL_REGEX, clean_email):
        raise HTTPException(status_code=400, detail="Please enter a valid email address.")
        
    existing = db.query(Subscriber).filter(Subscriber.email == clean_email).first()
    if existing:
        return {
            "status": "exists",
            "message": "You're already subscribed to AIAndBeyond!"
        }
    
    subscriber = Subscriber(email=clean_email)
    db.add(subscriber)
    db.commit()
    db.refresh(subscriber)
    return {
        "status": "success",
        "message": "Thank you for subscribing to AIAndBeyond!"
    }

@router.get("/admin/subscribers", response_model=List[SubscriberOut])
def get_subscribers(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    return db.query(Subscriber).order_by(Subscriber.created_at.desc()).all()

@router.delete("/admin/subscribers/{subscriber_id}")
def delete_subscriber(subscriber_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    sub = db.query(Subscriber).filter(Subscriber.id == subscriber_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    db.delete(sub)
    db.commit()
    return {"message": "Subscriber removed successfully"}
