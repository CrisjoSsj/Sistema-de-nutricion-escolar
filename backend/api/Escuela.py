from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
import sys
import os

# Agregar el directorio padre al path para importar módulos
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models import (
    EscuelaCreate,
    EscuelaUpdate,
    EscuelaResponse,
    RolUsuario
)
from auth import get_current_user, get_admin_user
from database import db

router = APIRouter(tags=["Escuelas"])

@router.get("/escuelas", response_model=List[EscuelaResponse])
async def get_escuelas(current_user: dict = Depends(get_current_user)):
    """
    Obtiene lista de escuelas
    - Admin: puede ver todas las escuelas
    - Rector: solo puede ver su escuela
    - Otros: solo pueden ver su escuela
    """
    escuelas = []
    
    if current_user.rol == RolUsuario.ADMIN:
        # Admin puede ver todas las escuelas
        for escuela in db.escuelas.values():
            escuelas.append(EscuelaResponse(
                id=escuela.id,
                nombre=escuela.nombre,
                direccion=escuela.direccion,
                telefono=escuela.telefono,
                email=escuela.email,
                activa=escuela.activa,
                fecha_creacion=escuela.fecha_creacion
            ))
    else:
        # Otros roles solo ven su escuela
        if current_user.escuela_id and current_user.escuela_id in db.escuelas:
            escuela = db.escuelas[current_user.escuela_id]
            escuelas.append(EscuelaResponse(
                id=escuela.id,
                nombre=escuela.nombre,
                direccion=escuela.direccion,
                telefono=escuela.telefono,
                email=escuela.email,
                activa=escuela.activa,
                fecha_creacion=escuela.fecha_creacion
            ))
    
    return escuelas

@router.get("/escuelas/{escuela_id}", response_model=EscuelaResponse)
async def get_escuela(
    escuela_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Obtiene una escuela específica por ID"""
    
    if escuela_id not in db.escuelas:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Escuela no encontrada"
        )
    
    escuela = db.escuelas[escuela_id]
    
    # Verificar permisos
    if current_user.rol != RolUsuario.ADMIN:
        if current_user.escuela_id != escuela_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes permisos para ver esta escuela"
            )
    
    return EscuelaResponse(
        id=escuela.id,
        nombre=escuela.nombre,
        direccion=escuela.direccion,
        telefono=escuela.telefono,
        email=escuela.email,
        activa=escuela.activa,
        fecha_creacion=escuela.fecha_creacion
    )

@router.post("/escuelas", response_model=EscuelaResponse)
async def create_escuela(
    escuela_data: EscuelaCreate,
    current_user: dict = Depends(get_admin_user)
):
    """
    Crea una nueva escuela (solo admin)
    """
    
    # Verificar si ya existe una escuela con el mismo nombre
    for escuela in db.escuelas.values():
        if escuela.nombre.lower() == escuela_data.nombre.lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Ya existe una escuela con este nombre"
            )
    
    # Crear la escuela
    nueva_escuela = db.create_escuela(escuela_data)
    
    return EscuelaResponse(
        id=nueva_escuela.id,
        nombre=nueva_escuela.nombre,
        direccion=nueva_escuela.direccion,
        telefono=nueva_escuela.telefono,
        email=nueva_escuela.email,
        activa=nueva_escuela.activa,
        fecha_creacion=nueva_escuela.fecha_creacion
    )

@router.put("/escuelas/{escuela_id}", response_model=EscuelaResponse)
async def update_escuela(
    escuela_id: str,
    escuela_data: EscuelaUpdate,
    current_user: dict = Depends(get_current_user)
):
    """
    Actualiza una escuela
    - Admin: puede actualizar cualquier escuela
    - Rector: solo puede actualizar su escuela
    """
    
    if escuela_id not in db.escuelas:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Escuela no encontrada"
        )
    
    # Verificar permisos
    if current_user.rol != RolUsuario.ADMIN:
        if current_user.escuela_id != escuela_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes permisos para actualizar esta escuela"
            )
    
    # Actualizar la escuela
    escuela_actualizada = db.update_escuela(escuela_id, escuela_data)
    
    return EscuelaResponse(
        id=escuela_actualizada.id,
        nombre=escuela_actualizada.nombre,
        direccion=escuela_actualizada.direccion,
        telefono=escuela_actualizada.telefono,
        email=escuela_actualizada.email,
        activa=escuela_actualizada.activa,
        fecha_creacion=escuela_actualizada.fecha_creacion
    )

@router.delete("/escuelas/{escuela_id}")
async def delete_escuela(
    escuela_id: str,
    current_user: dict = Depends(get_admin_user)
):
    """
    Elimina una escuela (solo admin)
    En lugar de eliminación física, desactiva la escuela
    """
    
    if escuela_id not in db.escuelas:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Escuela no encontrada"
        )
    
    # Verificar si hay usuarios asociados a esta escuela
    usuarios_en_escuela = [
        user for user in db.usuarios.values() 
        if user.escuela_id == escuela_id and user.activo
    ]
    
    if usuarios_en_escuela:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"No se puede eliminar la escuela. Hay {len(usuarios_en_escuela)} usuarios activos asociados"
        )
    
    # Desactivar escuela en lugar de eliminar
    db.escuelas[escuela_id].activa = False
    
    return {"message": "Escuela desactivada exitosamente"}