from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import sys
import os

# Agregar el directorio actual al path para importar módulos
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from api import Usuario, Escuela, Menu, Comida, Autenticacion, Feedback
from database import db
from models import RolUsuario
from auth import get_current_user

# Inicializar la base de datos al startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Inicializar la base de datos
    db.initialize_sample_data()
    print("✅ Base de datos inicializada con datos de ejemplo")
    print("\n🔐 Credenciales de acceso:")
    print("Admin: admin@sistema.cl / admin123")
    print("Rector: rector1@sistema.cl / rector123")
    print("Nutricionista: nutricionista1@sistema.cl / nutri123")
    print("Padre: juan.perez@email.com / padre123")
    print("Estudiante: ana.martinez@email.com / estudiante123")
    yield
    # Shutdown
    print("🔄 Cerrando aplicación...")

app = FastAPI(
    title="Sistema de Nutrición Escolar API",
    description="""
    API completa para el sistema de gestión de nutrición escolar.
    
    ## Características
    
    * **Autenticación JWT** - Sistema de autenticación seguro con tokens
    * **Control de roles** - Admin, Rector, Nutricionista, Padre, Estudiante
    * **Gestión de escuelas** - CRUD completo de instituciones educativas
    * **Gestión de usuarios** - Control de acceso jerárquico por escuela
    * **Planificación de menús** - Creación y gestión de menús nutricionales
    * **Base de datos de comidas** - Información nutricional detallada
    * **Sistema de feedback** - Evaluaciones y comentarios de los usuarios
    * **Reportes y estadísticas** - Analytics del sistema
    
    ## Autenticación
    
    Para usar la API, primero inicia sesión en `/api/login` con las credenciales proporcionadas.
    Luego usa el token devuelto en el header `Authorization: Bearer {token}`.
    
    ## Roles y permisos
    
    - **Admin**: Acceso completo a todas las funciones
    - **Rector**: Gestión de su escuela y usuarios asociados
    - **Nutricionista**: Creación y gestión de menús y comidas
    - **Padre**: Visualización de menús y creación de feedback
    - **Estudiante**: Visualización de menús y creación de feedback
    """,
    version="2.0.0",
    lifespan=lifespan,
    contact={
        "name": "Sistema de Nutrición Escolar",
        "email": "admin@sistema.cl"
    }
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React dev
        "http://localhost:5173",  # Vite dev
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "*"  # En producción, especificar dominios exactos
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Incluir todos los routers
app.include_router(Autenticacion.router, prefix="/api/auth", tags=["🔐 Autenticación"])
app.include_router(Usuario.router, prefix="/api", tags=["👥 Usuarios"])
app.include_router(Escuela.router, prefix="/api", tags=["🏫 Escuelas"])
app.include_router(Menu.router, prefix="/api", tags=["📋 Menús"])
app.include_router(Comida.router, prefix="/api", tags=["🍽️ Comidas"])
app.include_router(Feedback.router, prefix="/api", tags=["💬 Feedback"])

@app.get("/", tags=["📊 Sistema"])
async def root():
    """
    Endpoint principal del sistema con información general y estadísticas básicas
    """
    # Estadísticas básicas
    total_escuelas = len([e for e in db.escuelas.values() if e.activa])
    total_usuarios = len([u for u in db.usuarios.values() if u.activo])
    total_menus = len([m for m in db.menus.values() if m.activo])
    total_comidas = len([c for c in db.comidas.values() if c.activa])
    total_feedback = len(db.feedback)
    
    return {
        "sistema": "Sistema de Nutrición Escolar",
        "version": "2.0.0",
        "estado": "Operativo",
        "descripcion": "API completa para gestión de nutrición escolar con autenticación JWT y control de roles",
        "estadisticas": {
            "escuelas_activas": total_escuelas,
            "usuarios_activos": total_usuarios,
            "menus_activos": total_menus,
            "comidas_disponibles": total_comidas,
            "feedback_total": total_feedback
        },
        "endpoints_principales": {
            "autenticacion": "/api/auth/login",
            "usuarios": "/api/usuarios",
            "escuelas": "/api/escuelas", 
            "menus": "/api/menus",
            "comidas": "/api/comidas",
            "feedback": "/api/feedback"
        },
        "documentacion": {
            "swagger_ui": "/docs",
            "redoc": "/redoc",
            "openapi_json": "/openapi.json"
        },
        "credenciales_demo": {
            "admin": "admin@sistema.cl / admin123",
            "rector": "rector1@sistema.cl / rector123",
            "nutricionista": "nutricionista1@sistema.cl / nutri123",
            "padre": "juan.perez@email.com / padre123",
            "estudiante": "ana.martinez@email.com / estudiante123"
        }
    }

@app.get("/api/health", tags=["📊 Sistema"])
async def health_check():
    """
    Verificación de salud del sistema
    """
    return {
        "estado": "Saludable",
        "sistema": "API Nutrición Escolar",
        "version": "2.0.0",
        "timestamp": db.get_current_timestamp(),
        "componentes": {
            "base_datos": "Operativa",
            "autenticacion": "Activa",
            "api_endpoints": "Disponibles"
        }
    }

@app.get("/api/stats", tags=["📊 Sistema"])
async def get_system_stats(current_user: dict = Depends(get_current_user)):
    """
    Estadísticas del sistema (requiere autenticación)
    Información detallada según el rol del usuario
    """
    stats = {
        "usuario_actual": {
            "nombre": current_user.nombre,
            "rol": current_user.rol.value,
            "escuela_id": current_user.escuela_id
        }
    }
    
    if current_user.rol == RolUsuario.ADMIN:
        # Stats completas para admin
        stats.update({
            "sistema_completo": {
                "escuelas": len(db.escuelas),
                "usuarios_por_rol": {
                    "admin": len([u for u in db.usuarios.values() if u.rol == RolUsuario.ADMIN]),
                    "rector": len([u for u in db.usuarios.values() if u.rol == RolUsuario.RECTOR]),
                    "nutricionista": len([u for u in db.usuarios.values() if u.rol == RolUsuario.NUTRICIONISTA]),
                    "padre": len([u for u in db.usuarios.values() if u.rol == RolUsuario.PADRE]),
                    "estudiante": len([u for u in db.usuarios.values() if u.rol == RolUsuario.ESTUDIANTE])
                },
                "menus_totales": len(db.menus),
                "comidas_totales": len(db.comidas),
                "feedback_total": len(db.feedback)
            }
        })
    elif current_user.rol == RolUsuario.RECTOR:
        # Stats de su escuela
        usuarios_escuela = [u for u in db.usuarios.values() if u.escuela_id == current_user.escuela_id]
        menus_escuela = [m for m in db.menus.values() if m.escuela_id == current_user.escuela_id]
        
        stats.update({
            "mi_escuela": {
                "usuarios_total": len(usuarios_escuela),
                "menus_activos": len([m for m in menus_escuela if m.activo]),
                "feedback_recibido": len([f for f in db.feedback.values() 
                                       if f.menu_id in [m.id for m in menus_escuela]])
            }
        })
    
    return stats

# Manejo de errores globales
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": True,
            "status_code": exc.status_code,
            "message": exc.detail,
            "path": str(request.url)
        }
    )