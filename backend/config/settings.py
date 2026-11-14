import os
from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

# Determine absolute path to .env files
BACKEND_DIR = Path(__file__).resolve().parent.parent
ROOT_DIR = BACKEND_DIR.parent

# Explicitly load .env into os.environ
load_dotenv(BACKEND_DIR / ".env")
load_dotenv(ROOT_DIR / ".env")


class Settings(BaseSettings):
    # App Settings
    APP_NAME: str = "HackMatrix API"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    PORT: int = 8000
    HOST: str = "0.0.0.0"

    # CORS
    CORS_ORIGINS: list[str] = ["*"]

    # Neon PostgreSQL URLs
    DATABASE_URL: str = ""
    DATABASE_URL_POOLED: str = ""
    NEON_AUTH_BASE_URL: str = ""

    # AI Engine Credentials (Gemini API Exclusively)
    GEMINI_API_KEY: str = ""
    GOOGLE_API_KEY: str = ""
    GEMINI_FAST_MODEL: str = "gemini-3.5-flash"
    GEMINI_REASONING_MODEL: str = "gemini-3.5-flash"
    GEMINI_LITE_MODEL: str = "gemini-3.1-flash-lite"

    # Clerk Authentication
    CLERK_SECRET_KEY: str = ""
    CLERK_PUBLISHABLE_KEY: str = ""
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=(str(BACKEND_DIR / ".env"), str(ROOT_DIR / ".env")),
        env_file_encoding="utf-8",
        extra="ignore"
    )

    @property
    def effective_gemini_key(self) -> str:
        return self.GEMINI_API_KEY or self.GOOGLE_API_KEY or os.getenv("GEMINI_API_KEY", "") or os.getenv("GOOGLE_API_KEY", "")


@lru_cache
def get_settings() -> Settings:
    return Settings()
