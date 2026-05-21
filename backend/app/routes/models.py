from fastapi import APIRouter, HTTPException
from services.ollama_service import ollama_service
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/models/ollama")
async def get_ollama_models():
    """Get list of available Ollama models"""
    try:
        models = await ollama_service.get_available_models()
        return {
            "success": True,
            "models": models,
            "count": len(models),
        }
    except Exception as e:
        logger.error(f"Error fetching Ollama models: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
