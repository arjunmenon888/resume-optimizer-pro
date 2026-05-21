from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from services.ollama_service import ollama_service
from services.cloud_ai_service import cloud_ai_service
from config import config
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class OptimizeRequest(BaseModel):
    mode: str
    provider: str = None
    model: str = None
    resume: str
    job_description: str
    api_key: str = None

@router.post("/optimize/resume")
async def optimize_resume(request: OptimizeRequest):
    """Optimize resume using AI"""
    if not request.resume or not request.job_description:
        raise HTTPException(status_code=400, detail="Resume and job description required")
    if request.mode == "local" and not request.model:
        raise HTTPException(status_code=400, detail="Model name required for local mode")
    if request.mode == "cloud" and not request.provider:
        raise HTTPException(status_code=400, detail="Provider required")
    if request.mode not in ("local", "cloud"):
        raise HTTPException(status_code=400, detail="Invalid mode. Must be local or cloud.")

    prompt = f"""{config.OPTIMIZE_RESUME_PROMPT}

RESUME:
{request.resume}

JOB DESCRIPTION:
{request.job_description}"""

    try:
        if request.mode == "local":
            optimized_resume = await ollama_service.generate_completion(request.model, prompt)
            cost = 0
        else:
            optimized_resume = await cloud_ai_service.generate_completion(
                request.provider, prompt, request.api_key
            )
            cost = (len(prompt) // 4) * 0.000002
        return {"success": True, "optimized_resume": optimized_resume, "cost": cost}
    except Exception as e:
        logger.error(f"Error optimizing resume: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
