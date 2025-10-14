from fastapi import APIRouter, HTTPException, Depends, status, Query
from typing import List, Optional
import sys
import os

# Agregar el directorio padre al path para importar módulos
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models import (
    ComidaCreate,
    ComidaUpdate,
    ComidaResponse,
    CategoriaComida,
    RolUsuario
)
from auth import get_current_user, get_nutricionista_user
from database import db

router = APIRouter(tags=["Comidas"])

@router.get("/comidas", response_model=List[ComidaResponse])
async def get_comidas(
    categoria: Optional[CategoriaComida] = Query(None, description="Filtrar por categoría"),
    max_calorias: Optional[int] = Query(None, description="Máximo de calorías"),
    min_proteinas: Optional[float] = Query(None, description="Mínimo de proteínas"),
    search: Optional[str] = Query(None, description="Buscar por nombre"),
    current_user: dict = Depends(get_current_user)
):
    """
    Obtiene lista de comidas con filtros opcionales
    Todos los usuarios autenticados pueden ver las comidas
    """
    comidas = []
    
    for comida in db.comidas.values():
        # Filtrar por categoría
        if categoria and comida.categoria != categoria:
            continue
        
        # Filtrar por calorías máximas
        if max_calorias and comida.calorias > max_calorias:
            continue
        
        # Filtrar por proteínas mínimas
        if min_proteinas and comida.proteinas < min_proteinas:
            continue
        
        # Filtrar por búsqueda en nombre
        if search and search.lower() not in comida.nombre.lower():
            continue
        
        comidas.append(ComidaResponse(
            id=comida.id,
            nombre=comida.nombre,
            categoria=comida.categoria,
            descripcion=comida.descripcion,
            calorias=comida.calorias,
            proteinas=comida.proteinas,
            grasas=comida.grasas,
            carbohidratos=comida.carbohidratos,
            fibra=comida.fibra,
            sodio=comida.sodio,
            azucar=comida.azucar,
            ingredientes=comida.ingredientes,
            alergenos=comida.alergenos,
            activa=comida.activa,
            fecha_creacion=comida.fecha_creacion
        ))
    
    # Ordenar por nombre
    comidas.sort(key=lambda x: x.nombre)
    
    return comidas

@router.get("/comidas/{comida_id}", response_model=ComidaResponse)
async def get_comida(
    comida_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Obtiene una comida específica por ID"""
    
    if comida_id not in db.comidas:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comida no encontrada"
        )
    
    comida = db.comidas[comida_id]
    
    return ComidaResponse(
        id=comida.id,
        nombre=comida.nombre,
        categoria=comida.categoria,
        descripcion=comida.descripcion,
        calorias=comida.calorias,
        proteinas=comida.proteinas,
        grasas=comida.grasas,
        carbohidratos=comida.carbohidratos,
        fibra=comida.fibra,
        sodio=comida.sodio,
        azucar=comida.azucar,
        ingredientes=comida.ingredientes,
        alergenos=comida.alergenos,
        activa=comida.activa,
        fecha_creacion=comida.fecha_creacion
    )

@router.get("/comidas/categoria/{categoria}", response_model=List[ComidaResponse])
async def get_comidas_by_categoria(
    categoria: CategoriaComida,
    current_user: dict = Depends(get_current_user)
):
    """Obtiene todas las comidas de una categoría específica"""
    
    comidas = []
    
    for comida in db.comidas.values():
        if comida.categoria == categoria and comida.activa:
            comidas.append(ComidaResponse(
                id=comida.id,
                nombre=comida.nombre,
                categoria=comida.categoria,
                descripcion=comida.descripcion,
                calorias=comida.calorias,
                proteinas=comida.proteinas,
                grasas=comida.grasas,
                carbohidratos=comida.carbohidratos,
                fibra=comida.fibra,
                sodio=comida.sodio,
                azucar=comida.azucar,
                ingredientes=comida.ingredientes,
                alergenos=comida.alergenos,
                activa=comida.activa,
                fecha_creacion=comida.fecha_creacion
            ))
    
    if not comidas:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No hay comidas en la categoría {categoria.value}"
        )
    
    # Ordenar por nombre
    comidas.sort(key=lambda x: x.nombre)
    
    return comidas

@router.get("/comidas/nutritivas/recomendadas", response_model=List[ComidaResponse])
async def get_comidas_recomendadas(
    max_calorias: int = Query(300, description="Máximo de calorías"),
    min_proteinas: float = Query(10.0, description="Mínimo de proteínas"),
    max_sodio: float = Query(500.0, description="Máximo de sodio (mg)"),
    current_user: dict = Depends(get_current_user)
):
    """Obtiene comidas recomendadas basadas en criterios nutricionales"""
    
    comidas_recomendadas = []
    
    for comida in db.comidas.values():
        if (comida.activa and 
            comida.calorias <= max_calorias and 
            comida.proteinas >= min_proteinas and 
            comida.sodio <= max_sodio):
            
            comidas_recomendadas.append(ComidaResponse(
                id=comida.id,
                nombre=comida.nombre,
                categoria=comida.categoria,
                descripcion=comida.descripcion,
                calorias=comida.calorias,
                proteinas=comida.proteinas,
                grasas=comida.grasas,
                carbohidratos=comida.carbohidratos,
                fibra=comida.fibra,
                sodio=comida.sodio,
                azucar=comida.azucar,
                ingredientes=comida.ingredientes,
                alergenos=comida.alergenos,
                activa=comida.activa,
                fecha_creacion=comida.fecha_creacion
            ))
    
    # Ordenar por valor nutricional (relación proteínas/calorías)
    comidas_recomendadas.sort(key=lambda x: x.proteinas / x.calorias, reverse=True)
    
    return comidas_recomendadas

@router.post("/comidas", response_model=ComidaResponse)
async def create_comida(
    comida_data: ComidaCreate,
    current_user: dict = Depends(get_nutricionista_user)
):
    """
    Crea una nueva comida (solo nutricionistas y admin)
    """
    
    # Verificar si ya existe una comida con el mismo nombre
    for comida in db.comidas.values():
        if comida.nombre.lower() == comida_data.nombre.lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Ya existe una comida con este nombre"
            )
    
    # Crear la comida
    nueva_comida = db.create_comida(comida_data)
    
    return ComidaResponse(
        id=nueva_comida.id,
        nombre=nueva_comida.nombre,
        categoria=nueva_comida.categoria,
        descripcion=nueva_comida.descripcion,
        calorias=nueva_comida.calorias,
        proteinas=nueva_comida.proteinas,
        grasas=nueva_comida.grasas,
        carbohidratos=nueva_comida.carbohidratos,
        fibra=nueva_comida.fibra,
        sodio=nueva_comida.sodio,
        azucar=nueva_comida.azucar,
        ingredientes=nueva_comida.ingredientes,
        alergenos=nueva_comida.alergenos,
        activa=nueva_comida.activa,
        fecha_creacion=nueva_comida.fecha_creacion
    )

@router.put("/comidas/{comida_id}", response_model=ComidaResponse)
async def update_comida(
    comida_id: str,
    comida_data: ComidaUpdate,
    current_user: dict = Depends(get_nutricionista_user)
):
    """Actualiza una comida existente"""
    
    if comida_id not in db.comidas:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comida no encontrada"
        )
    
    # Actualizar la comida
    comida_actualizada = db.update_comida(comida_id, comida_data)
    
    return ComidaResponse(
        id=comida_actualizada.id,
        nombre=comida_actualizada.nombre,
        categoria=comida_actualizada.categoria,
        descripcion=comida_actualizada.descripcion,
        calorias=comida_actualizada.calorias,
        proteinas=comida_actualizada.proteinas,
        grasas=comida_actualizada.grasas,
        carbohidratos=comida_actualizada.carbohidratos,
        fibra=comida_actualizada.fibra,
        sodio=comida_actualizada.sodio,
        azucar=comida_actualizada.azucar,
        ingredientes=comida_actualizada.ingredientes,
        alergenos=comida_actualizada.alergenos,
        activa=comida_actualizada.activa,
        fecha_creacion=comida_actualizada.fecha_creacion
    )

@router.delete("/comidas/{comida_id}")
async def delete_comida(
    comida_id: str,
    current_user: dict = Depends(get_nutricionista_user)
):
    """
    Elimina una comida
    En lugar de eliminación física, desactiva la comida
    """
    
    if comida_id not in db.comidas:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comida no encontrada"
        )
    
    # Verificar si la comida está siendo usada en algún menú activo
    comida_en_uso = False
    for menu in db.menus.values():
        if menu.activo:
            # Aquí se verificaría si la comida está en el menú
            # Por simplicidad, asumimos que no está en uso
            pass
    
    if comida_en_uso:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No se puede eliminar una comida que está siendo usada en menús activos"
        )
    
    # Desactivar comida en lugar de eliminar
    db.comidas[comida_id].activa = False
    
    return {"message": "Comida desactivada exitosamente"}