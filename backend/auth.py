from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from passlib.context import CryptContext
import hashlib
from models import *
from database import db

# Configuración de seguridad
SECRET_KEY = "tu_clave_secreta_super_segura_aqui_2024"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 480  # 8 horas

# Configuración de hash de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

class AuthService:
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        """Verificar contraseña"""
        # Para desarrollo, usamos hash simple
        return hashlib.sha256(plain_password.encode()).hexdigest() == hashed_password
    
    @staticmethod
    def get_password_hash(password: str) -> str:
        """Hashear contraseña"""
        return hashlib.sha256(password.encode()).hexdigest()
    
    @staticmethod
    def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
        """Crear token JWT"""
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    
    @staticmethod
    def verify_token(token: str) -> Dict[str, Any]:
        """Verificar y decodificar token JWT"""
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_id: int = payload.get("sub")
            if user_id is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Token inválido"
                )
            return payload
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido"
            )
    
    @staticmethod
    def authenticate_user(email: str, password: str) -> Optional[Usuario]:
        """Autenticar usuario"""
        # Buscar usuario por email
        user = None
        for u in db.usuarios.values():
            if u.email == email and u.activo:
                user = u
                break
        
        # Para desarrollo, usar contraseñas predefinidas
        default_passwords = {
            "admin@sistema.cl": "admin123",
            "rector1@sistema.cl": "rector123",
            "rector2@sistema.cl": "rector123", 
            "rector3@sistema.cl": "rector123",
            "nutricionista1@sistema.cl": "nutri123",
            "nutricionista2@sistema.cl": "nutri123",
            "nutricionista3@sistema.cl": "nutri123",
            "juan.perez@email.com": "padre123",
            "ana.martinez@email.com": "estudiante123",
            "ana.garcia@email.com": "padre123",
            "luis.morales@email.com": "padre123",
            "carmen.torres@email.com": "padre123",
            "miguel.rojas@email.com": "padre123",
            "patricia.vega@email.com": "padre123",
            "fernando.castro@email.com": "padre123",
            "diana.herrera@email.com": "padre123",
            "roberto.sanchez@email.com": "padre123"
        }
        
        # Verificar contraseña
        if user and email in default_passwords and password == default_passwords[email]:
            # Actualizar último acceso
            user.ultimo_acceso = datetime.now()
            return user
        
        return None
    
    @staticmethod
    def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Usuario:
        """Obtener usuario actual desde token"""
        token = credentials.credentials
        payload = AuthService.verify_token(token)
        user_id = payload.get("sub")
        
        # Buscar usuario
        for user in db.usuarios.values():
            if user.id == user_id and user.activo:
                return user
        
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario no encontrado"
        )

class PermissionService:
    @staticmethod
    def check_admin(current_user: Usuario):
        """Verificar que el usuario sea administrador"""
        if current_user.rol != RolUsuario.ADMINISTRADOR:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Acceso denegado: Se requieren permisos de administrador"
            )
    
    @staticmethod
    def check_rector_or_admin(current_user: Usuario):
        """Verificar que el usuario sea rector o administrador"""
        if current_user.rol not in [RolUsuario.RECTOR, RolUsuario.ADMINISTRADOR]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Acceso denegado: Se requieren permisos de rector o administrador"
            )
    
    @staticmethod
    def check_nutricionista_or_higher(current_user: Usuario):
        """Verificar que el usuario sea nutricionista, rector o administrador"""
        if current_user.rol not in [RolUsuario.NUTRICIONISTA, RolUsuario.RECTOR, RolUsuario.ADMINISTRADOR]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Acceso denegado: Se requieren permisos de nutricionista o superior"
            )
    
    @staticmethod
    def check_same_school_or_admin(current_user: Usuario, target_school_id: int):
        """Verificar que el usuario pertenezca a la misma escuela o sea administrador"""
        if current_user.rol == RolUsuario.ADMINISTRADOR:
            return  # Admin puede acceder a cualquier escuela
        
        if current_user.escuela_id != target_school_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Acceso denegado: No tienes permisos para esta escuela"
            )
    
    @staticmethod
    def check_own_data_or_admin(current_user: Usuario, target_user_id: int):
        """Verificar que sea el mismo usuario o administrador"""
        if current_user.rol == RolUsuario.ADMINISTRADOR:
            return
        
        if current_user.id != target_user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Acceso denegado: Solo puedes acceder a tus propios datos"
            )

# Funciones auxiliares para dependencias
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Usuario:
    return AuthService.get_current_user(credentials)

def get_admin_user(current_user: Usuario = Depends(get_current_user)) -> Usuario:
    PermissionService.check_admin(current_user)
    return current_user

def get_rector_or_admin(current_user: Usuario = Depends(get_current_user)) -> Usuario:
    PermissionService.check_rector_or_admin(current_user)
    return current_user

def get_nutricionista_or_higher(current_user: Usuario = Depends(get_current_user)) -> Usuario:
    PermissionService.check_nutricionista_or_higher(current_user)
    return current_user

def get_rector_user(current_user: Usuario = Depends(get_current_user)) -> Usuario:
    """Función que permite acceso a rectores y admins"""
    PermissionService.check_rector_or_admin(current_user)
    return current_user

def get_nutricionista_user(current_user: Usuario = Depends(get_current_user)) -> Usuario:
    """Función que permite acceso a nutricionistas y superiores"""
    PermissionService.check_nutricionista_or_higher(current_user)
    return current_user