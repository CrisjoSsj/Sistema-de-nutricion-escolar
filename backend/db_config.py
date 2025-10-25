from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import StaticPool
import os
from dotenv import load_dotenv
from typing import Generator

# Cargar variables de entorno
load_dotenv()

# Configuración de la base de datos
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/nutricion_escolar")
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# Crear engine de SQLAlchemy
if ENVIRONMENT == "test":
    # Para testing, usar SQLite en memoria
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
else:
    # Para desarrollo y producción, usar PostgreSQL
    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,
        pool_size=10,
        max_overflow=20,
        echo=False  # Cambiar a True para ver los queries SQL en desarrollo
    )

# Crear SessionLocal
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db() -> Generator[Session, None, None]:
    """
    Dependencia de FastAPI para obtener una sesión de base de datos.
    
    Uso:
    ```python
    @app.get("/items")
    def read_items(db: Session = Depends(get_db)):
        items = db.query(Item).all()
        return items
    ```
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Inicializar todas las tablas en la base de datos"""
    from models_db import Base
    Base.metadata.create_all(bind=engine)
    print("✅ Tablas de base de datos creadas exitosamente")

def drop_all_tables():
    """Eliminar todas las tablas (usar con cuidado!)"""
    from models_db import Base
    Base.metadata.drop_all(bind=engine)
    print("⚠️  Todas las tablas han sido eliminadas")

def reset_db():
    """Resetear la base de datos (eliminar y recrear todas las tablas)"""
    drop_all_tables()
    init_db()
    print("🔄 Base de datos reseteada exitosamente")
