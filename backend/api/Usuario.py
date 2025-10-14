from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Optional
import sys
import os

# Agregar el directorio padre al path para importar módulos
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models import (
    UsuarioCreate,
    UsuarioUpdate, 
    UsuarioResponse,
    RolUsuario
)
from auth import get_current_user, get_admin_user, get_rector_user
from database import db

router = APIRouter(tags=["Usuarios"])

@router.get("/usuarios", response_model=List[UsuarioResponse])
async def get_usuarios(
    escuela_id: Optional[str] = None,
    rol: Optional[RolUsuario] = None,
    current_user: dict = Depends(get_current_user)
):
    """
    Obtiene lista de usuarios con filtros opcionales
    - Admins: pueden ver todos los usuarios
    - Rectores: solo usuarios de su escuela
    - Otros roles: solo su propio perfil
    """
    usuarios = []
    
    # Solo admin puede ver todos los usuarios sin restricciones
    if current_user.rol == RolUsuario.ADMIN:
        for user in db.usuarios.values():
            if escuela_id and user.escuela_id != escuela_id:
                continue
            if rol and user.rol != rol:
                continue
            usuarios.append(UsuarioResponse(
                id=user.id,
                nombre=user.nombre,
                email=user.email,
                rol=user.rol,
                escuela_id=user.escuela_id,
                activo=user.activo,
                fecha_creacion=user.fecha_creacion,
                ultimo_acceso=user.ultimo_acceso
            ))
    
    # Rector puede ver usuarios de su escuela
    elif current_user.rol == RolUsuario.RECTOR:
        for user in db.usuarios.values():
            if user.escuela_id != current_user.escuela_id:
                continue
            if rol and user.rol != rol:
                continue
            usuarios.append(UsuarioResponse(
                id=user.id,
                nombre=user.nombre,
                email=user.email,
                rol=user.rol,
                escuela_id=user.escuela_id,
                activo=user.activo,
                fecha_creacion=user.fecha_creacion,
                ultimo_acceso=user.ultimo_acceso
            ))
    
    # Otros roles solo ven su propio perfil
    else:
        usuarios.append(UsuarioResponse(
            id=current_user.id,
            nombre=current_user.nombre,
            email=current_user.email,
            rol=current_user.rol,
            escuela_id=current_user.escuela_id,
            activo=current_user.activo,
            fecha_creacion=current_user.fecha_creacion,
            ultimo_acceso=current_user.ultimo_acceso
        ))
    
    return usuarios

@router.get("/usuarios/{usuario_id}", response_model=UsuarioResponse)
async def get_usuario(
    usuario_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Obtiene un usuario específico por ID"""
    
    if usuario_id not in db.usuarios:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )
    
    usuario = db.usuarios[usuario_id]
    
    # Verificar permisos
    if current_user.rol == RolUsuario.ADMIN:
        # Admin puede ver cualquier usuario
        pass
    elif current_user.rol == RolUsuario.RECTOR:
        # Rector solo puede ver usuarios de su escuela
        if usuario.escuela_id != current_user.escuela_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes permisos para ver este usuario"
            )
    else:
        # Otros roles solo pueden ver su propio perfil
        if usuario_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes permisos para ver este usuario"
            )
    
    return UsuarioResponse(
        id=usuario.id,
        nombre=usuario.nombre,
        email=usuario.email,
        rol=usuario.rol,
        escuela_id=usuario.escuela_id,
        activo=usuario.activo,
        fecha_creacion=usuario.fecha_creacion,
        ultimo_acceso=usuario.ultimo_acceso
    )

@router.post("/usuarios", response_model=UsuarioResponse)
async def create_usuario(
    usuario_data: UsuarioCreate,
    current_user: dict = Depends(get_rector_user)
):
    """
    Crea un nuevo usuario
    Solo rectores y admins pueden crear usuarios
    """
    
    # Verificar si el email ya existe
    for existing_user in db.usuarios.values():
        if existing_user.email == usuario_data.email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Ya existe un usuario con este email"
            )
    
    # Solo rector puede crear usuarios en su escuela
    if current_user.rol == RolUsuario.RECTOR:
        if usuario_data.escuela_id != current_user.escuela_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Solo puedes crear usuarios en tu escuela"
            )
    
    # Crear el usuario
    nuevo_usuario = db.create_usuario(usuario_data)
    
    return UsuarioResponse(
        id=nuevo_usuario.id,
        nombre=nuevo_usuario.nombre,
        email=nuevo_usuario.email,
        rol=nuevo_usuario.rol,
        escuela_id=nuevo_usuario.escuela_id,
        activo=nuevo_usuario.activo,
        fecha_creacion=nuevo_usuario.fecha_creacion,
        ultimo_acceso=nuevo_usuario.ultimo_acceso
    )

@router.put("/usuarios/{usuario_id}", response_model=UsuarioResponse)
async def update_usuario(
    usuario_id: str,
    usuario_data: UsuarioUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Actualiza un usuario existente"""
    
    if usuario_id not in db.usuarios:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )
    
    usuario = db.usuarios[usuario_id]
    
    # Verificar permisos
    if current_user.rol == RolUsuario.ADMIN:
        # Admin puede actualizar cualquier usuario
        pass
    elif current_user.rol == RolUsuario.RECTOR:
        # Rector solo puede actualizar usuarios de su escuela
        if usuario.escuela_id != current_user.escuela_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes permisos para actualizar este usuario"
            )
    else:
        # Otros roles solo pueden actualizar su propio perfil
        if usuario_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes permisos para actualizar este usuario"
            )
        # Los usuarios regulares no pueden cambiar su rol
        if usuario_data.rol and usuario_data.rol != usuario.rol:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No puedes cambiar tu propio rol"
            )
    
    # Actualizar el usuario
    usuario_actualizado = db.update_usuario(usuario_id, usuario_data)
    
    return UsuarioResponse(
        id=usuario_actualizado.id,
        nombre=usuario_actualizado.nombre,
        email=usuario_actualizado.email,
        rol=usuario_actualizado.rol,
        escuela_id=usuario_actualizado.escuela_id,
        activo=usuario_actualizado.activo,
        fecha_creacion=usuario_actualizado.fecha_creacion,
        ultimo_acceso=usuario_actualizado.ultimo_acceso
    )

@router.delete("/usuarios/{usuario_id}")
async def delete_usuario(
    usuario_id: str,
    current_user: dict = Depends(get_admin_user)
):
    """
    Elimina un usuario (solo admin)
    En lugar de eliminación física, desactiva al usuario
    """
    
    if usuario_id not in db.usuarios:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )
    
    # No permitir auto-eliminación
    if usuario_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No puedes eliminar tu propia cuenta"
        )
    
    # Desactivar usuario en lugar de eliminar
    db.usuarios[usuario_id].activo = False
    
    return {"message": "Usuario desactivado exitosamente"}