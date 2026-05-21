import httpx
import json
import os
from config import config

class CloudAIService:
    async def call_anthropic(self, prompt: str, api_key: str = None) -> str:
        """Call Anthropic Claude API"""
        key = api_key or config.ANTHROPIC_API_KEY
        if not key:
            raise ValueError("ANTHROPIC_API_KEY not set")

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://api.anthropic.com/v1/messages",
                    json={
                        "model": "claude-3-sonnet-20240229",
                        "max_tokens": 2048,
                        "messages": [{"role": "user", "content": prompt}],
                    },
                    headers={
                        "x-api-key": key,
                        "anthropic-version": "2023-06-01",
                        "content-type": "application/json",
                    },
                    timeout=60.0,
                )
                data = response.json()
                return data["content"][0]["text"]
        except Exception as e:
            raise Exception(f"Anthropic API error: {str(e)}")

    async def call_openai(self, prompt: str, api_key: str = None) -> str:
        """Call OpenAI GPT API"""
        key = api_key or config.OPENAI_API_KEY
        if not key:
            raise ValueError("OPENAI_API_KEY not set")

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    json={
                        "model": "gpt-4-turbo-preview",
                        "messages": [{"role": "user", "content": prompt}],
                        "max_tokens": 2048,
                    },
                    headers={"Authorization": f"Bearer {key}"},
                    timeout=60.0,
                )
                data = response.json()
                return data["choices"][0]["message"]["content"]
        except Exception as e:
            raise Exception(f"OpenAI API error: {str(e)}")

    async def call_google(self, prompt: str, api_key: str = None) -> str:
        """Call Google Gemini API"""
        key = api_key or config.GOOGLE_API_KEY
        if not key:
            raise ValueError("GOOGLE_API_KEY not set")

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={key}",
                    json={
                        "contents": [{"parts": [{"text": prompt}]}],
                    },
                    timeout=60.0,
                )
                data = response.json()
                return data["candidates"][0]["content"]["parts"][0]["text"]
        except Exception as e:
            raise Exception(f"Google API error: {str(e)}")

    async def generate_completion(self, provider: str, prompt: str, api_key: str = None) -> str:
        """Route to correct provider"""
        if provider == "anthropic":
            return await self.call_anthropic(prompt, api_key)
        elif provider == "openai":
            return await self.call_openai(prompt, api_key)
        elif provider == "google":
            return await self.call_google(prompt, api_key)
        else:
            raise ValueError(f"Unknown provider: {provider}")

# Create singleton instance
cloud_ai_service = CloudAIService()
