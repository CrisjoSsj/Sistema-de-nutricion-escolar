from fastapi import APIRouter, HTTPException, Depends, status, Query
from typing import List, Optional
from datetime import date, datetime, timedelta
import sys
import os

# Agregar el directorio padre al path para importar módulos
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models import (
    FeedbackCreate,
    FeedbackUpdate,
    FeedbackResponse,
    FeedbackEstadisticas,
    RolUsuario
)
from auth import get_current_user
from database import db

router = APIRouter(tags=["Feedback"])

@router.get("/feedback", response_model=List[FeedbackResponse])
async def get_feedback(
    menu_id: Optional[str] = Query(None, description="Filtrar por menú"),
    usuario_id: Optional[str] = Query(None, description="Filtrar por usuario"),
    calificacion_min: Optional[int] = Query(None, ge=1, le=5, description="Calificación mínima"),
    fecha_inicio: Optional[date] = Query(None, description="Fecha de inicio"),
    fecha_fin: Optional[date] = Query(None, description="Fecha de fin"),
    current_user: dict = Depends(get_current_user)
):
    """
    Obtiene feedback con filtros opcionales
    - Admin: puede ver todo el feedback
    - Rector/Nutricionista: feedback de su escuela
    - Padres/Estudiantes: solo su feedback
    """
    feedbacks = []
    
    for feedback in db.feedback.values():
        # Verificar permisos por rol
        if current_user.rol == RolUsuario.ADMIN:
            # Admin puede ver todo
            pass
        elif current_user.rol in [RolUsuario.RECTOR, RolUsuario.NUTRICIONISTA]:
            # Verificar que el feedback sea de un menú de su escuela
            if feedback.menu_id in db.menus:
                menu = db.menus[feedback.menu_id]
                if menu.escuela_id != current_user.escuela_id:
                    continue
            else:
                continue
        else:
            # Padres y estudiantes solo ven su propio feedback
            if feedback.usuario_id != current_user.id:
                continue
        
        # Aplicar filtros
        if menu_id and feedback.menu_id != menu_id:
            continue
        
        if usuario_id and feedback.usuario_id != usuario_id:
            continue
        
        if calificacion_min and feedback.calificacion < calificacion_min:
            continue
        
        if fecha_inicio and feedback.fecha < fecha_inicio:
            continue
        
        if fecha_fin and feedback.fecha > fecha_fin:
            continue
        
        # Obtener información del usuario y menú
        usuario = db.usuarios.get(feedback.usuario_id, None)
        menu = db.menus.get(feedback.menu_id, None)
        
        feedbacks.append(FeedbackResponse(
            id=feedback.id,
            menu_id=feedback.menu_id,
            usuario_id=feedback.usuario_id,
            calificacion=feedback.calificacion,
            comentario=feedback.comentario,
            fecha=feedback.fecha,
            usuario_nombre=usuario.nombre if usuario else "Usuario desconocido",
            menu_nombre=menu.nombre if menu else "Menú desconocido",
            menu_fecha=menu.fecha if menu else None,
            menu_tipo=menu.tipo if menu else None
        ))
    
    # Ordenar por fecha descendente
    feedbacks.sort(key=lambda x: x.fecha, reverse=True)
    
    return feedbacks

@router.get("/feedback/{feedback_id}", response_model=FeedbackResponse)
async def get_feedback_by_id(
    feedback_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Obtiene un feedback específico por ID"""
    
    if feedback_id not in db.feedback:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Feedback no encontrado"
        )
    
    feedback = db.feedback[feedback_id]
    
    # Verificar permisos
    if current_user.rol == RolUsuario.ADMIN:
        pass
    elif current_user.rol in [RolUsuario.RECTOR, RolUsuario.NUTRICIONISTA]:
        # Verificar que sea de su escuela
        if feedback.menu_id in db.menus:
            menu = db.menus[feedback.menu_id]
            if menu.escuela_id != current_user.escuela_id:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="No tienes permisos para ver este feedback"
                )
    else:
        # Solo el autor puede ver su feedback
        if feedback.usuario_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes permisos para ver este feedback"
            )
    
    # Obtener información adicional
    usuario = db.usuarios.get(feedback.usuario_id, None)
    menu = db.menus.get(feedback.menu_id, None)
    
    return FeedbackResponse(
        id=feedback.id,
        menu_id=feedback.menu_id,
        usuario_id=feedback.usuario_id,
        calificacion=feedback.calificacion,
        comentario=feedback.comentario,
        fecha=feedback.fecha,
        usuario_nombre=usuario.nombre if usuario else "Usuario desconocido",
        menu_nombre=menu.nombre if menu else "Menú desconocido",
        menu_fecha=menu.fecha if menu else None,
        menu_tipo=menu.tipo if menu else None
    )

@router.get("/feedback/menu/{menu_id}", response_model=List[FeedbackResponse])
async def get_feedback_by_menu(
    menu_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Obtiene todo el feedback para un menú específico"""
    
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
                detail="No tienes permisos para ver feedback de este menú"
            )
    
    feedbacks = []
    for feedback in db.feedback.values():
        if feedback.menu_id == menu_id:
            usuario = db.usuarios.get(feedback.usuario_id, None)
            
            feedbacks.append(FeedbackResponse(
                id=feedback.id,
                menu_id=feedback.menu_id,
                usuario_id=feedback.usuario_id,
                calificacion=feedback.calificacion,
                comentario=feedback.comentario,
                fecha=feedback.fecha,
                usuario_nombre=usuario.nombre if usuario else "Usuario desconocido",
                menu_nombre=menu.nombre,
                menu_fecha=menu.fecha,
                menu_tipo=menu.tipo
            ))
    
    if not feedbacks:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No hay feedback para este menú"
        )
    
    # Ordenar por fecha descendente
    feedbacks.sort(key=lambda x: x.fecha, reverse=True)
    
    return feedbacks

@router.get("/feedback/estadisticas/menu/{menu_id}", response_model=FeedbackEstadisticas)
async def get_feedback_estadisticas(
    menu_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Obtiene estadísticas del feedback para un menú específico"""
    
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
                detail="No tienes permisos para ver estadísticas de este menú"
            )
    
    # Obtener feedback del menú
    feedback_del_menu = [f for f in db.feedback.values() if f.menu_id == menu_id]
    
    if not feedback_del_menu:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No hay feedback para este menú"
        )
    
    # Calcular estadísticas
    total_feedback = len(feedback_del_menu)
    suma_calificaciones = sum(f.calificacion for f in feedback_del_menu)
    promedio_calificacion = suma_calificaciones / total_feedback
    
    # Distribución de calificaciones
    distribucion = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
    for feedback in feedback_del_menu:
        distribucion[feedback.calificacion] += 1
    
    # Calificación más común
    calificacion_mas_comun = max(distribucion, key=distribucion.get)
    
    # Comentarios recientes (últimos 5)
    comentarios_recientes = sorted(
        [f for f in feedback_del_menu if f.comentario.strip()],
        key=lambda x: x.fecha,
        reverse=True
    )[:5]
    
    return FeedbackEstadisticas(
        menu_id=menu_id,
        total_feedback=total_feedback,
        promedio_calificacion=round(promedio_calificacion, 2),
        distribucion_calificaciones=distribucion,
        calificacion_mas_comun=calificacion_mas_comun,
        comentarios_recientes=[f.comentario for f in comentarios_recientes]
    )

@router.post("/feedback", response_model=FeedbackResponse)
async def create_feedback(
    feedback_data: FeedbackCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Crea un nuevo feedback
    Solo padres y estudiantes pueden crear feedback
    """
    
    # Verificar que el usuario puede crear feedback
    if current_user.rol not in [RolUsuario.PADRE, RolUsuario.ESTUDIANTE]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Solo padres y estudiantes pueden crear feedback"
        )
    
    # Verificar que el menú existe
    if feedback_data.menu_id not in db.menus:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Menú no encontrado"
        )
    
    menu = db.menus[feedback_data.menu_id]
    
    # Verificar que el menú es de la escuela del usuario
    if menu.escuela_id != current_user.escuela_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Solo puedes dar feedback a menús de tu escuela"
        )
    
    # Verificar que no haya feedback duplicado
    for feedback in db.feedback.values():
        if feedback.menu_id == feedback_data.menu_id and feedback.usuario_id == current_user.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Ya has dado feedback para este menú"
            )
    
    # Crear el feedback
    nuevo_feedback = db.create_feedback(feedback_data, current_user.id)
    
    return FeedbackResponse(
        id=nuevo_feedback.id,
        menu_id=nuevo_feedback.menu_id,
        usuario_id=nuevo_feedback.usuario_id,
        calificacion=nuevo_feedback.calificacion,
        comentario=nuevo_feedback.comentario,
        fecha=nuevo_feedback.fecha,
        usuario_nombre=current_user.nombre,
        menu_nombre=menu.nombre,
        menu_fecha=menu.fecha,
        menu_tipo=menu.tipo
    )

@router.put("/feedback/{feedback_id}", response_model=FeedbackResponse)
async def update_feedback(
    feedback_id: str,
    feedback_data: FeedbackUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Actualiza un feedback existente (solo el autor puede actualizar)"""
    
    if feedback_id not in db.feedback:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Feedback no encontrado"
        )
    
    feedback = db.feedback[feedback_id]
    
    # Solo el autor puede actualizar su feedback
    if feedback.usuario_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Solo puedes actualizar tu propio feedback"
        )
    
    # Verificar límite de tiempo para actualizar (ej: 24 horas)
    if (datetime.now().date() - feedback.fecha).days > 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No puedes actualizar feedback después de 24 horas"
        )
    
    # Actualizar el feedback
    feedback_actualizado = db.update_feedback(feedback_id, feedback_data)
    
    # Obtener información adicional
    menu = db.menus.get(feedback_actualizado.menu_id, None)
    
    return FeedbackResponse(
        id=feedback_actualizado.id,
        menu_id=feedback_actualizado.menu_id,
        usuario_id=feedback_actualizado.usuario_id,
        calificacion=feedback_actualizado.calificacion,
        comentario=feedback_actualizado.comentario,
        fecha=feedback_actualizado.fecha,
        usuario_nombre=current_user.nombre,
        menu_nombre=menu.nombre if menu else "Menú desconocido",
        menu_fecha=menu.fecha if menu else None,
        menu_tipo=menu.tipo if menu else None
    )

@router.delete("/feedback/{feedback_id}")
async def delete_feedback(
    feedback_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Elimina un feedback
    - El autor puede eliminar su propio feedback
    - Admin puede eliminar cualquier feedback
    """
    
    if feedback_id not in db.feedback:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Feedback no encontrado"
        )
    
    feedback = db.feedback[feedback_id]
    
    # Verificar permisos
    if current_user.rol != RolUsuario.ADMIN and feedback.usuario_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos para eliminar este feedback"
        )
    
    # Eliminar feedback
    del db.feedback[feedback_id]
    
    return {"message": "Feedback eliminado exitosamente"}