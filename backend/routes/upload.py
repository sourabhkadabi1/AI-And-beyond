import os
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from cloudinary_config import upload_image
from auth import get_current_admin
from schemas import ImageUploadResponse

router = APIRouter()

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
CHUNK_SIZE = 1024 * 1024  # 1MB chunks
ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp', '.gif'}
ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}

# Magic bytes for image format validation
IMAGE_SIGNATURES = {
    b'\xff\xd8\xff': 'image/jpeg',
    b'\x89PNG\r\n\x1a\n': 'image/png',
    b'RIFF': 'image/webp',  # WebP starts with RIFF
    b'GIF87a': 'image/gif',
    b'GIF89a': 'image/gif',
}

def _validate_magic_bytes(data: bytes) -> bool:
    """Verify the file's magic bytes match a known image format."""
    for signature in IMAGE_SIGNATURES:
        if data[:len(signature)] == signature:
            return True
    return False

@router.post("/upload/image", response_model=ImageUploadResponse)
async def upload_post_image(
    file: UploadFile = File(...),
    admin=Depends(get_current_admin)
):
    # Validate content type
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(status_code=400, detail="Only JPEG, PNG, WebP, GIF allowed")
    
    # Validate file extension
    ext = os.path.splitext(file.filename or "")[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Invalid file extension")
    
    # Stream file in chunks to prevent OOM on large uploads
    total_bytes = bytearray()
    while True:
        chunk = await file.read(CHUNK_SIZE)
        if not chunk:
            break
        total_bytes.extend(chunk)
        if len(total_bytes) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail="File too large. Max 10MB.")
    
    if len(total_bytes) == 0:
        raise HTTPException(status_code=400, detail="Empty file uploaded")
    
    # Validate magic bytes to prevent MIME type spoofing
    if not _validate_magic_bytes(bytes(total_bytes)):
        raise HTTPException(status_code=400, detail="File content does not match a valid image format")
    
    try:
        result = upload_image(bytes(total_bytes))
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error uploading image to Cloudinary")
