from fastapi import APIRouter, UploadFile, File
from app.services.image_processing import preprocess_for_yolo

router = APIRouter()

@router.post("/preprocess")
async def preprocess(image: UploadFile = File(...)):
    image_bytes = await image.read()
    processed_img = preprocess_for_yolo(image_bytes)
    return {"status": "Image prétraitée", "shape": processed_img.shape}
