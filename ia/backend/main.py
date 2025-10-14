from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Sistema de Nutrición Escolar API",
    description="API para la gestión de nutrición en instituciones educativas",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Sistema de Nutrición Escolar API - ¡Funcionando! 🍎"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API funcionando correctamente"}

# Rutas temporales para demo
@app.post("/api/v1/auth/login")
async def login_demo():
    return {
        "access_token": "demo-token",
        "token_type": "bearer",
        "user": {
            "id": 1,
            "email": "admin@sistema.com",
            "first_name": "Super",
            "last_name": "Admin",
            "role": "superadmin",
            "institution_id": None,
            "is_active": True,
            "created_at": "2025-01-01T00:00:00Z",
            "updated_at": "2025-01-01T00:00:00Z"
        }
    }

@app.get("/api/v1/auth/me")
async def get_current_user_demo():
    return {
        "id": 1,
        "email": "admin@sistema.com",
        "first_name": "Super",
        "last_name": "Admin",
        "role": "superadmin",
        "institution_id": None,
        "is_active": True,
        "created_at": "2025-01-01T00:00:00Z",
        "updated_at": "2025-01-01T00:00:00Z"
    }

@app.get("/api/v1/reports/dashboard") 
async def get_dashboard_stats():
    return {
        "total_students": 120,
        "total_menus": 15,
        "daily_consumption_rate": 85.5,
        "weekly_consumption_trend": [],
        "food_group_consumption": []
    }

@app.get("/api/v1/institutions")
async def get_institutions():
    return [
        {
            "id": 1,
            "name": "Escuela Primaria El Futuro",
            "address": "Av. Educación 123, Ciudad",
            "phone": "+1234567890",
            "email": "contacto@escuelafuturo.edu",
            "is_active": True,
            "created_at": "2025-01-01T00:00:00Z",
            "updated_at": "2025-01-01T00:00:00Z"
        }
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )