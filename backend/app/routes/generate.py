from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.document_service import document_service
from typing import Optional, List
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class ExperienceItem(BaseModel):
    title: str
    company: str
    duration: str
    description: str

class EducationItem(BaseModel):
    degree: str
    school: str
    year: str

class ResumeDataModel(BaseModel):
    name: str
    email: str
    phone: str
    location: str
    summary: str
    experience: List[ExperienceItem] = []
    education: List[EducationItem] = []
    skills: List[str] = []

class GenerateRequest(BaseModel):
    optimized_resume: Optional[str] = None
    resume_data: Optional[ResumeDataModel] = None
    file_name: Optional[str] = None

@router.post("/generate/resume")
async def generate_resume(request: GenerateRequest):
    """Generate ATS-optimized Word document"""
    if not request.optimized_resume and not request.resume_data:
        raise HTTPException(status_code=400, detail="Optimized resume or resume data required")

    if request.resume_data:
        resume_data = request.resume_data.dict()
    else:
        resume_data = document_service.parse_resume_text(request.optimized_resume)

    try:
        doc = document_service.generate_ats_resume(resume_data)
        result = await document_service.save_resume(doc, request.file_name)

        return {
            "success": True,
            "id": result["id"],
            "fileName": result["file_name"],
            "downloadUrl": result["download_url"],
        }
    except Exception as e:
        logger.error(f"Error generating resume: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
