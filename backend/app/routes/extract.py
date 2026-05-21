from fastapi import APIRouter, UploadFile, File, HTTPException
from services.extraction_service import extraction_service
import os
import tempfile
import logging

router = APIRouter()
logger = logging.getLogger(__name__)


async def _extract_uploaded_file(file: UploadFile) -> str:
    """Save upload to a temp file, extract text, clean up."""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    suffix = os.path.splitext(file.filename)[1] or ".tmp"
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
    try:
        content = await file.read()
        tmp.write(content)
        tmp.close()
        return await extraction_service.extract(
            tmp.name, file.content_type or "", file.filename
        )
    finally:
        tmp.close()
        if os.path.exists(tmp.name):
            os.remove(tmp.name)


@router.post("/extract/resume")
async def extract_resume(file: UploadFile = File(...)):
    """Extract text from a resume file (PDF, Word, PPT, image, or plain text)."""
    try:
        text = await _extract_uploaded_file(file)
        return {"success": True, "extracted_text": text}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error extracting resume: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/extract/job-description")
async def extract_job_description(file: UploadFile = File(...)):
    """Extract text from a job description file (PDF, Word, PPT, image, or plain text)."""
    try:
        text = await _extract_uploaded_file(file)
        return {"success": True, "extracted_text": text}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error extracting job description: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
