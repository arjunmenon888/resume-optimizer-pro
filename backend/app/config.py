import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # App
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
    DEBUG = os.getenv("DEBUG", "false").lower() == "true"
    PORT = int(os.getenv("PORT", 8000))
    HOST = os.getenv("HOST", "0.0.0.0")

    # API
    API_TITLE = "Resume Optimizer API"
    API_VERSION = "1.0.0"

    # Ollama
    OLLAMA_ENDPOINT = os.getenv("OLLAMA_ENDPOINT", "http://localhost:11434")
    OLLAMA_TIMEOUT = int(os.getenv("OLLAMA_TIMEOUT", 300))

    # Cloud AI
    ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

    # File Upload
    MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", 10485760))
    UPLOAD_DIR = os.getenv("UPLOAD_DIR", "./uploads")
    ALLOWED_UPLOAD_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"]

    # CORS
    FRONTEND_URLS = [
    "http://localhost:8082",  # ← ADD THIS (Expo web)
    "http://localhost:19006",
    "http://localhost:3000",
    "http://127.0.0.1:8082",  # ← ADD THIS
    "http://127.0.0.1:19006",
    "http://127.0.0.1:3000",
    ]

    # Prompts
    OPTIMIZE_RESUME_PROMPT = """You are a professional resume optimizer and ATS expert.
Analyze the resume and job description provided.
Optimize the resume to match the job description while maintaining accuracy.
Focus on:
1. ATS-friendly formatting
2. Keyword alignment
3. Impact and achievements
4. Proper structure

Return ONLY the optimized resume text without any explanation or markdown."""

    EXTRACT_KEYWORDS_PROMPT = """You are an ATS expert.
Extract the top 10-15 keywords and required skills from this job description.
Format as JSON: {"keywords": ["skill1", "skill2", ...]}
Return ONLY valid JSON, no explanation."""

config = Config()
