from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import os
from config import config
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/download/{resume_id}")
async def download_resume(resume_id: str):
    """Download generated resume Word document"""
    file_path = os.path.join(config.UPLOAD_DIR, f"{resume_id}.docx")

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Resume file not found")

    try:
        return FileResponse(
            file_path,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            filename=f"resume-{resume_id}.docx"
        )
    except Exception as e:
        logger.error(f"Error downloading resume: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
