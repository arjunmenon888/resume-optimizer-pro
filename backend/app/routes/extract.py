from fastapi import APIRouter, UploadFile, File, HTTPException
from services.ocr_service import ocr_service
import os
import tempfile
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/extract/job-description")
async def extract_job_description(file: UploadFile = File(...)):
    """Extract text from job description file (image or PDF)"""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    suffix = os.path.splitext(file.filename)[1] or ".tmp"
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
    try:
        content = await file.read()
        tmp.write(content)
        tmp.close()

        extracted_text = await ocr_service.extract_from_file(tmp.name, file.content_type)
        return {"success": True, "extracted_text": extracted_text}
    except Exception as e:
        logger.error(f"Error extracting job description: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        tmp.close()
        if os.path.exists(tmp.name):
            os.remove(tmp.name)
