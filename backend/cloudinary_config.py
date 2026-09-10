import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

def upload_image(file_bytes, folder="aiandbeyond"):
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
