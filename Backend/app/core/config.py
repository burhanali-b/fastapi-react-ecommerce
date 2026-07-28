from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://chemisto:chemisto_pass@localhost:5432/chemisto_db"

    # JWT
    SECRET_KEY: str = "change-this-secret-key-in-production-minimum-32-characters"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Owner credentials
    OWNER_EMAIL: str = "owner@chemisto.com"
    OWNER_PASSWORD: str = "ChemistoOwner2024!"
    OWNER_FIRST_NAME: str = "Store"
    OWNER_LAST_NAME: str = "Owner"

    # CORS
    FRONTEND_URL: str = "http://localhost:5173"

    # File uploads
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE: int = 5242880  # 5MB

    # Chatbot API keys
    GOOGLE_API_KEY: str | None = None
    OPENAI_API_KEY: str | None = None
    GOOGLE_PROJECT_ID: str | None = None
    GOOGLE_LOCATION: str = "us-central1"

    # App
    APP_NAME: str = "CHEMISTO's Store"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    # DB Pool
    DB_POOL_SIZE: int = 20
    DB_MAX_OVERFLOW: int = 10
    DB_POOL_TIMEOUT: int = 30
    DB_POOL_RECYCLE: int = 1800
    DB_POOL_PRE_PING: bool = True

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
