from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

# Modelos temporales para demo
class LoginRequest(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    role: str
    institution_id: Optional[int] = None
    is_active: bool
    created_at: str
    updated_at: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

@router.post("/login", response_model=Token)
async def login(login_data: LoginRequest):
    """Endpoint de prueba para login"""
    # Por ahora devolvemos datos de prueba
    user_data = None
    
    # Simular diferentes usuarios según el email
    if login_data.email == "admin@sistema.com" and login_data.password == "admin123":
        user_data = {
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
    elif login_data.email == "nutri@escuela.com" and login_data.password == "nutri123":
        user_data = {
            "id": 2,
            "email": "nutri@escuela.com",
            "first_name": "María",
            "last_name": "González",
            "role": "nutritionist",
            "institution_id": 1,
            "is_active": True,
            "created_at": "2025-01-01T00:00:00Z",
            "updated_at": "2025-01-01T00:00:00Z"
        }
    elif login_data.email == "estudiante@escuela.com" and login_data.password == "est123":
        user_data = {
            "id": 3,
            "email": "estudiante@escuela.com",
            "first_name": "Juan",
            "last_name": "Pérez",
            "role": "student",
            "institution_id": 1,
            "is_active": True,
            "created_at": "2025-01-01T00:00:00Z",
            "updated_at": "2025-01-01T00:00:00Z"
        }
    elif login_data.email == "padre@correo.com" and login_data.password == "padre123":
        user_data = {
            "id": 4,
            "email": "padre@correo.com",
            "first_name": "Carlos",
            "last_name": "Pérez",
            "role": "parent",
            "institution_id": 1,
            "is_active": True,
            "created_at": "2025-01-01T00:00:00Z",
            "updated_at": "2025-01-01T00:00:00Z"
        }
    
    if not user_data:
        return {"error": "Credenciales inválidas"}
    
    user_response = UserResponse(**user_data)
    
    return Token(
        access_token="demo-token-" + user_data["role"],
        token_type="bearer",
        user=user_response
    )

@router.get("/me", response_model=UserResponse)
async def get_current_user():
    """Endpoint de prueba para obtener usuario actual"""
    return UserResponse(
        id=1,
        email="admin@sistema.com",
        first_name="Super",
        last_name="Admin",
        role="superadmin",
        institution_id=None,
        is_active=True,
        created_at="2025-01-01T00:00:00Z",
        updated_at="2025-01-01T00:00:00Z"
    )