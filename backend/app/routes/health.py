from fastapi import APIRouter
from config import config

router = APIRouter()

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "✅ Backend running",
        "environment": config.ENVIRONMENT,
        "version": config.API_VERSION,
        "ollama_endpoint": config.OLLAMA_ENDPOINT,
    }
