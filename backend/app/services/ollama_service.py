import httpx
import json
from config import config

class OllamaService:
    def __init__(self):
        self.endpoint = config.OLLAMA_ENDPOINT
        self.timeout = config.OLLAMA_TIMEOUT

    async def get_available_models(self):
        """Get list of available Ollama models"""
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(f"{self.endpoint}/api/tags")
                data = response.json()
                models = [
                    {
                        "name": m["name"],
                        "modified_at": m["modified_at"],
                        "size": m["size"],
                    }
                    for m in data.get("models", [])
                ]
                return models
        except Exception as e:
            raise Exception(f"Failed to fetch Ollama models: {str(e)}")

    async def generate_completion(self, model: str, prompt: str) -> str:
        """Generate completion using Ollama"""
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.post(
                    f"{self.endpoint}/api/generate",
                    json={
                        "model": model,
                        "prompt": prompt,
                        "stream": False,
                    }
                )
                data = response.json()
                return data["response"]
        except Exception as e:
            raise Exception(f"Ollama inference failed: {str(e)}")

# Create singleton instance
ollama_service = OllamaService()
