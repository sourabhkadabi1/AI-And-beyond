from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from cloudinary_config import upload_image
from auth import get_current_admin
from schemas import ImageUploadResponse

router = APIRouter()

@router.post("/upload/image", response_model=ImageUploadResponse)
async def upload_post_image(
    file: UploadFile = File(...),
    admin=Depends(get_current_admin)
):
    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Only JPEG, PNG, WebP, GIF allowed")
    
    file_bytes = await file.read()
    if len(file_bytes) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Max 10MB.")
    
    result = upload_image(file_bytes)
    return result
