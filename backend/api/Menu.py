from fastapi import APIRouter, HTTPException, Depends, status, Query
from typing import List, Optional
from datetime import date, datetime, timedelta
import sys
import os

# Agregar el directorio padre al path para importar módulos
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models import (
    MenuCreate,
    MenuUpdate,
    MenuResponse,
    TipoMenu,
    RolUsuario
)
from auth import get_current_user, get_nutricionista_user
from database import db

router = APIRouter(tags=["Menus"])

@router.get("/menus", response_model=List[MenuResponse])
async def get_menus(
    escuela_id: Optional[str] = Query(None, description="ID de la escuela"),
    fecha_inicio: Optional[date] = Query(None, description="Fecha de inicio (YYYY-MM-DD)"),
    fecha_fin: Optional[date] = Query(None, description="Fecha de fin (YYYY-MM-DD)"),
    tipo: Optional[TipoMenu] = Query(None, description="Tipo de menú"),
    current_user: dict = Depends(get_current_user)
):
    """
    Obtiene lista de menús con filtros opcionales
    - Admin: puede ver todos los menús
    - Rector/Nutricionista: solo menús de su escuela
    - Padres/Estudiantes: solo menús de su escuela
    """
    menus = []
    
    # Determinar la escuela a filtrar
    target_escuela_id = escuela_id
    if current_user.rol != RolUsuario.ADMIN:
        target_escuela_id = current_user.escuela_id
    
    # Si no se especifican fechas, mostrar menús de la próxima semana
    if not fecha_inicio:
        fecha_inicio = date.today()
    if not fecha_fin:
        fecha_fin = fecha_inicio + timedelta(days=7)
    
    for menu in db.menus.values():
        # Filtrar por escuela
        if target_escuela_id and menu.escuela_id != target_escuela_id:
            continue
        
        # Filtrar por fechas
        if fecha_inicio and menu.fecha < fecha_inicio:
            continue
        if fecha_fin and menu.fecha > fecha_fin:
            continue
        
        # Filtrar por tipo
        if tipo and menu.tipo != tipo:
            continue
        
        menus.append(MenuResponse(
            id=menu.id,
            escuela_id=menu.escuela_id,
            fecha=menu.fecha,
            tipo=menu.tipo,
            nombre=menu.nombre,
            descripcion=menu.descripcion,
            activo=menu.activo,
            creado_por=menu.creado_por,
            fecha_creacion=menu.fecha_creacion
        ))
    
    # Ordenar por fecha y tipo
    menus.sort(key=lambda x: (x.fecha, x.tipo.value))
    
    return menus

@router.get("/menus/{menu_id}", response_model=MenuResponse)
async def get_menu(
    menu_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Obtiene un menú específico por ID"""
    
    if menu_id not in db.menus:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Menú no encontrado"
        )
    
    menu = db.menus[menu_id]
    
    # Verificar permisos
    if current_user.rol != RolUsuario.ADMIN:
        if menu.escuela_id != current_user.escuela_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes permisos para ver este menú"
            )
    
    return MenuResponse(
        id=menu.id,
        escuela_id=menu.escuela_id,
        fecha=menu.fecha,
        tipo=menu.tipo,
        nombre=menu.nombre,
        descripcion=menu.descripcion,
        activo=menu.activo,
        creado_por=menu.creado_por,
        fecha_creacion=menu.fecha_creacion
    )

@router.get("/menus/fecha/{fecha}", response_model=List[MenuResponse])
async def get_menus_by_fecha(
    fecha: date,
    current_user: dict = Depends(get_current_user)
):
    """Obtiene todos los menús de una fecha específica"""
    
    menus = []
    target_escuela_id = current_user.escuela_id if current_user.rol != RolUsuario.ADMIN else None
    
    for menu in db.menus.values():
        if menu.fecha != fecha:
            continue
        
        if target_escuela_id and menu.escuela_id != target_escuela_id:
            continue
        
        menus.append(MenuResponse(
            id=menu.id,
            escuela_id=menu.escuela_id,
            fecha=menu.fecha,
            tipo=menu.tipo,
            nombre=menu.nombre,
            descripcion=menu.descripcion,
            activo=menu.activo,
            creado_por=menu.creado_por,
            fecha_creacion=menu.fecha_creacion
        ))
    
    if not menus:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No hay menús para esta fecha"
        )
    
    # Ordenar por tipo
    menus.sort(key=lambda x: x.tipo.value)
    
    return menus

@router.get("/menus/semana/{fecha_inicio}", response_model=List[MenuResponse])
async def get_menus_semana(
    fecha_inicio: date,
    current_user: dict = Depends(get_current_user)
):
    """Obtiene todos los menús de una semana (7 días) a partir de una fecha"""
    
    fecha_fin = fecha_inicio + timedelta(days=6)
    
    menus = []
    target_escuela_id = current_user.escuela_id if current_user.rol != RolUsuario.ADMIN else None
    
    for menu in db.menus.values():
        if not (fecha_inicio <= menu.fecha <= fecha_fin):
            continue
        
        if target_escuela_id and menu.escuela_id != target_escuela_id:
            continue
        
        menus.append(MenuResponse(
            id=menu.id,
            escuela_id=menu.escuela_id,
            fecha=menu.fecha,
            tipo=menu.tipo,
            nombre=menu.nombre,
            descripcion=menu.descripcion,
            activo=menu.activo,
            creado_por=menu.creado_por,
            fecha_creacion=menu.fecha_creacion
        ))
    
    # Ordenar por fecha y tipo
    menus.sort(key=lambda x: (x.fecha, x.tipo.value))
    
    return menus

@router.post("/menus", response_model=MenuResponse)
async def create_menu(
    menu_data: MenuCreate,
    current_user: dict = Depends(get_nutricionista_user)
):
    """
    Crea un nuevo menú (solo nutricionistas y admin)
    """
    
    # Solo nutricionista puede crear menús en su escuela
    if current_user.rol == RolUsuario.NUTRICIONISTA:
        if menu_data.escuela_id != current_user.escuela_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Solo puedes crear menús en tu escuela"
            )
    
    # Verificar si ya existe un menú del mismo tipo para la misma fecha y escuela
    for menu in db.menus.values():
        if (menu.escuela_id == menu_data.escuela_id and 
            menu.fecha == menu_data.fecha and 
            menu.tipo == menu_data.tipo and
            menu.activo):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Ya existe un menú de {menu_data.tipo.value} para esta fecha en esta escuela"
            )
    
    # Crear el menú
    nuevo_menu = db.create_menu(menu_data, current_user.id)
    
    return MenuResponse(
        id=nuevo_menu.id,
        escuela_id=nuevo_menu.escuela_id,
        fecha=nuevo_menu.fecha,
        tipo=nuevo_menu.tipo,
        nombre=nuevo_menu.nombre,
        descripcion=nuevo_menu.descripcion,
        activo=nuevo_menu.activo,
        creado_por=nuevo_menu.creado_por,
        fecha_creacion=nuevo_menu.fecha_creacion
    )

@router.put("/menus/{menu_id}", response_model=MenuResponse)
async def update_menu(
    menu_id: str,
    menu_data: MenuUpdate,
    current_user: dict = Depends(get_nutricionista_user)
):
    """Actualiza un menú existente"""
    
    if menu_id not in db.menus:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Menú no encontrado"
        )
    
    menu = db.menus[menu_id]
    
    # Verificar permisos
    if current_user.rol == RolUsuario.NUTRICIONISTA:
        if menu.escuela_id != current_user.escuela_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes permisos para actualizar este menú"
            )
    
    # Actualizar el menú
    menu_actualizado = db.update_menu(menu_id, menu_data)
    
    return MenuResponse(
        id=menu_actualizado.id,
        escuela_id=menu_actualizado.escuela_id,
        fecha=menu_actualizado.fecha,
        tipo=menu_actualizado.tipo,
        nombre=menu_actualizado.nombre,
        descripcion=menu_actualizado.descripcion,
        activo=menu_actualizado.activo,
        creado_por=menu_actualizado.creado_por,
        fecha_creacion=menu_actualizado.fecha_creacion
    )

@router.delete("/menus/{menu_id}")
async def delete_menu(
    menu_id: str,
    current_user: dict = Depends(get_nutricionista_user)
):
    """
    Elimina un menú
    En lugar de eliminación física, desactiva el menú
    """
    
    if menu_id not in db.menus:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Menú no encontrado"
        )
    
    menu = db.menus[menu_id]
    
    # Verificar permisos
    if current_user.rol == RolUsuario.NUTRICIONISTA:
        if menu.escuela_id != current_user.escuela_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes permisos para eliminar este menú"
            )
    
    # Verificar si el menú está en el pasado
    if menu.fecha < date.today():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No se pueden eliminar menús de fechas pasadas"
        )
    
    # Desactivar menú en lugar de eliminar
    db.menus[menu_id].activo = False
    
    return {"message": "Menú desactivado exitosamente"}