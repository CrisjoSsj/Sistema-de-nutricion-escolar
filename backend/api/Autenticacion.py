from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm, HTTPAuthorizationCredentials
from fastapi.responses import JSONResponse
from datetime import timedelta
import sys
import os

# Agregar el directorio padre al path para importar módulos
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models import UsuarioLogin, LoginResponse, UsuarioResponse
from auth import AuthService, get_current_user, security
from database import db

router = APIRouter(tags=["Autenticación"])

@router.post("/login", response_model=LoginResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Endpoint para autenticación de usuarios usando OAuth2 estándar
    Credenciales de prueba:
    - admin@sistema.cl / admin123
    - rector1@sistema.cl / rector123
    - nutricionista1@sistema.cl / nutri123  
    - juan.perez@email.com / padre123
    """
    try:
        # Autenticar usuario (username será el email)
        user = AuthService.authenticate_user(form_data.username, form_data.password)
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Email o contraseña incorrectos",
                headers={"WWW-Authenticate": "Bearer"}
            )
        
        # Crear token de acceso
        access_token_expires = timedelta(minutes=480)  # 8 horas
        access_token = AuthService.create_access_token(
            data={"sub": user.id, "email": user.email, "rol": user.rol.value},
            expires_delta=access_token_expires
        )
        
        # Crear respuesta del usuario
        user_response = UsuarioResponse(
            id=user.id,
            nombre=user.nombre,
            email=user.email,
            rol=user.rol,
            escuela_id=user.escuela_id,
            activo=user.activo,
            fecha_creacion=user.fecha_creacion,
            ultimo_acceso=user.ultimo_acceso
        )
        
        return LoginResponse(
            access_token=access_token,
            token_type="bearer",
            user=user_response,
            expires_in=28800  # 8 horas en segundos
        )
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error en login: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al procesar la solicitud de login"
        )

@router.post("/logout")
async def logout(current_user: dict = Depends(get_current_user)):
    """Cierra sesión del usuario actual"""
    return {"message": "Logout exitoso", "user_id": current_user.id}

@router.post("/verify-token")
async def verify_user_token(current_user: dict = Depends(get_current_user)):
    """Verifica si un token es válido y retorna información del usuario"""
    return {
        "valid": True,
        "usuario": {
            "id": current_user.id,
            "nombre": current_user.nombre,
            "email": current_user.email,
            "rol": current_user.rol.value,
            "escuela_id": current_user.escuela_id
        }
    }

@router.get("/profile", response_model=UsuarioResponse)
async def get_profile(current_user: dict = Depends(get_current_user)):
    """Obtiene el perfil del usuario autenticado"""
    return UsuarioResponse(
        id=current_user.id,
        nombre=current_user.nombre,
        email=current_user.email,
        rol=current_user.rol,
        escuela_id=current_user.escuela_id,
        activo=current_user.activo,
        fecha_creacion=current_user.fecha_creacion,
        ultimo_acceso=current_user.ultimo_acceso
    )