from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Configuración de la aplicación
    APP_NAME: str = "Sistema de Nutrición Escolar"
    VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # Configuración de Supabase
    SUPABASE_URL: str = "https://your-project-id.supabase.co"
    SUPABASE_KEY: str = "your-anon-key"
    SUPABASE_SERVICE_KEY: str = "your-service-role-key"
    
    # Configuración JWT
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 horas
    
    # Configuración de la base de datos
    DATABASE_URL: Optional[str] = None
    
    model_config = {"env_file": ".env"}

settings = Settings()