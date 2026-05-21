from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
import sys

# Add app to path
sys.path.insert(0, os.path.dirname(__file__))

from config import config
from routes import models, extract, optimize, generate, download, health

# Create FastAPI app
app = FastAPI(
    title=config.API_TITLE,
    version=config.API_VERSION,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS Middleware — must be added before routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.FRONTEND_URLS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routes
app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(models.router, prefix="/api", tags=["models"])
app.include_router(extract.router, prefix="/api", tags=["extract"])
app.include_router(optimize.router, prefix="/api", tags=["optimize"])
app.include_router(generate.router, prefix="/api", tags=["generate"])
app.include_router(download.router, prefix="/api", tags=["download"])

# Create uploads directory if it doesn't exist
os.makedirs(config.UPLOAD_DIR, exist_ok=True)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=config.HOST,
        port=config.PORT,
        reload=config.DEBUG,
        log_level="info",
    )
