from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from models import Post, Admin
from routes.posts import router as posts_router
from routes.admin import router as admin_router
from routes.upload import router as upload_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AIAndBeyond API",
    description="Backend for AIAndBeyond AI & Tech blog",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://ainandbeyond.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(posts_router, prefix="/api")
app.include_router(admin_router, prefix="/api")
app.include_router(upload_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "AIAndBeyond API is running"}
