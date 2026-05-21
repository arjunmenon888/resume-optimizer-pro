from pydantic import BaseModel
from typing import List, Optional

class OptimizeRequest(BaseModel):
    mode: str  # "local" or "cloud"
    provider: Optional[str] = None  # "anthropic", "openai", "google"
    model: Optional[str] = None  # Ollama model name
    resume: str
    job_description: str
    api_key: Optional[str] = None

class GenerateResumeRequest(BaseModel):
    optimized_resume: str
    resume_data: Optional[dict] = None
    file_name: Optional[str] = None

class ResumeData(BaseModel):
    name: str
    email: str
    phone: str
    location: str
    summary: str
    experience: List[dict] = []
    education: List[dict] = []
    skills: List[str] = []

class OllamaModel(BaseModel):
    name: str
    modified_at: str
    size: int

class GenerateResponse(BaseModel):
    success: bool
    id: str
    fileName: str
    downloadUrl: str
