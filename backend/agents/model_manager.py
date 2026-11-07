import os
import asyncio
import logging
from typing import List, Optional, Tuple, Any
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Ensure backend .env is loaded
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))
load_dotenv()

logger = logging.getLogger('gemini_model_manager')

DEFAULT_MODELS = [
    'gemini-3.1-flash-lite',
    'gemini-3.5-flash-lite',
    'gemini-3-flash-preview',
    'gemini-flash-lite-latest',
    'gemini-2.5-flash'
]

def get_gemini_client() -> Optional[genai.Client]:
    """Get initialized Gemini client or None if API key is not configured."""
    api_key = os.getenv('GEMINI_API_KEY', '').strip()
    if not api_key:
        return None
    try:
        return genai.Client(api_key=api_key)
    except Exception as e:
        logger.error(f"Failed to initialize Gemini Client: {e}")
        return None

def get_configured_models() -> List[str]:
    """Get list of Gemini models in priority order from env or default."""
    env_models = os.getenv('GEMINI_MODELS', '').strip()
    if env_models:
        models = [m.strip() for m in env_models.split(',') if m.strip()]
        if models:
            return models
    return list(DEFAULT_MODELS)

async def generate_with_fallback(
    prompt: str,
    config: Optional[types.GenerateContentConfig] = None,
    timeout_per_model: float = 45.0,
    preferred_models: Optional[List[str]] = None
) -> Tuple[Optional[str], Optional[str]]:
    """
    Generate content with automatic multi-model rotation & fallback.
    Tries each model in priority sequence if quota, rate limit, or errors occur.

    Returns:
        Tuple of (response_text, successful_model_name), or (None, None) if all fail.
    """
    client = get_gemini_client()
    if not client:
        logger.warning("No GEMINI_API_KEY available for Gemini calls")
        return None, None

    models = preferred_models or get_configured_models()

    for model_name in models:
        try:
            logger.info(f"🤖 Attempting Gemini generation using model '{model_name}'...")
            response = await asyncio.wait_for(
                client.aio.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=config
                ),
                timeout=timeout_per_model
            )

            if response and response.text:
                logger.info(f"✅ Model '{model_name}' responded successfully ({len(response.text)} chars)")
                return response.text, model_name
            else:
                logger.warning(f"⚠️ Model '{model_name}' returned empty response. Rotating to next...")

        except Exception as e:
            logger.warning(
                f"⚠️ Gemini model '{model_name}' failed or exhausted quota: {e}. "
                f"Rotating to next model in chain..."
            )
            continue

    logger.error("❌ All configured Gemini models exhausted or failed.")
    return None, None
