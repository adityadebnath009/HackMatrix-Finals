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

    # AI API Credentials
    GROQ_API_KEY: str = ""
    GEMINI_API_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=(str(BACKEND_DIR / ".env"), str(ROOT_DIR / ".env")),
        env_file_encoding="utf-8",
        extra="ignore"
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
