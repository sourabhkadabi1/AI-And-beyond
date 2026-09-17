import cloudinary
import cloudinary.uploader
import os
import logging
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME")
api_key = os.getenv("CLOUDINARY_API_KEY")
api_secret = os.getenv("CLOUDINARY_API_SECRET")

if not all([cloud_name, api_key, api_secret]):
    logger.warning("Cloudinary environment variables are missing.")

cloudinary.config(
    cloud_name=cloud_name,
    api_key=api_key,
    api_secret=api_secret,
    secure=True
)

def upload_image(file_bytes, folder="aiandbeyond"):
    if not cloud_name:
        raise ValueError("Cloudinary is not configured.")
        
    result = cloudinary.uploader.upload(
        file_bytes,
        folder=folder,
        transformation=[
            {"width": 1200, "height": 630, "crop": "fill"},
            {"quality": "auto"},
            {"fetch_format": "auto"}
        ]
    )
    return {
        "url": result["secure_url"],
        "public_id": result["public_id"]
    }
