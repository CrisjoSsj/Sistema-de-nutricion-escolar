from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter(tags=["Menu-Comida Relations"])

class MenuComida(BaseModel):
    menu_id: str
    comida_id: str
    orden: int  # Para mantener el orden de las comidas en el menú

class MenuCompleto(BaseModel):
    menu_id: str
    fecha: str
    tipo: str
    descripcion: str
    comidas: List[dict]  # Lista de comidas con sus detalles

# Relaciones Menu-Comida (muchos a muchos)
menu_comida_relations = [
    MenuComida(menu_id="550e8400-e29b-41d4-a716-446655440001", comida_id="660e8400-e29b-41d4-a716-446655440003", orden=1),  # Desayuno: Jugo
    MenuComida(menu_id="550e8400-e29b-41d4-a716-446655440001", comida_id="660e8400-e29b-41d4-a716-446655440004", orden=2),  # Desayuno: Yogur
    
    MenuComida(menu_id="550e8400-e29b-41d4-a716-446655440002", comida_id="660e8400-e29b-41d4-a716-446655440001", orden=1),  # Almuerzo: Arroz con pollo
    MenuComida(menu_id="550e8400-e29b-41d4-a716-446655440002", comida_id="660e8400-e29b-41d4-a716-446655440002", orden=2),  # Almuerzo: Ensalada
    
    MenuComida(menu_id="550e8400-e29b-41d4-a716-446655440003", comida_id="660e8400-e29b-41d4-a716-446655440004", orden=1),  # Merienda: Yogur
    MenuComida(menu_id="550e8400-e29b-41d4-a716-446655440003", comida_id="660e8400-e29b-41d4-a716-446655440003", orden=2),  # Merienda: Jugo
]

# Importar datos de otros módulos (simulado)
from api.Menu import Menu_list
from api.Comida import Comida_list

@router.get("/menu/{menu_id}/comidas", response_model=List[dict])
async def get_comidas_por_menu(menu_id: str):
    """Obtiene todas las comidas de un menú específico"""
    # Buscar las relaciones para este menú
    relaciones = [r for r in menu_comida_relations if r.menu_id == menu_id]
    
    if not relaciones:
        raise HTTPException(status_code=404, detail="No se encontraron comidas para este menú")
    
    # Ordenar por orden
    relaciones.sort(key=lambda x: x.orden)
    
    # Obtener detalles de las comidas
    comidas_detalle = []
    for relacion in relaciones:
        comida = next((c for c in Comida_list if c.id_comida == relacion.comida_id), None)
        if comida:
            comidas_detalle.append({
                "id_comida": comida.id_comida,
                "nombre": comida.nombre,
                "categoria": comida.categoria,
                "calorias": comida.calorias,
                "proteinas": comida.proteinas,
                "grasas": comida.grasas,
                "carbohidratos": comida.carbohidratos,
                "orden": relacion.orden
            })
    
    return comidas_detalle

@router.get("/menu/{menu_id}/completo", response_model=MenuCompleto)
async def get_menu_completo(menu_id: str):
    """Obtiene un menú con todas sus comidas"""
    # Buscar el menú
    menu = next((m for m in Menu_list if m.id_menu == menu_id), None)
    if not menu:
        raise HTTPException(status_code=404, detail="Menú no encontrado")
    
    # Obtener las comidas del menú
    comidas = await get_comidas_por_menu(menu_id)
    
    return MenuCompleto(
        menu_id=menu.id_menu,
        fecha=str(menu.fecha),
        tipo=menu.tipo,
        descripcion=menu.descripcion,
        comidas=comidas
    )

@router.post("/menu/{menu_id}/comida/{comida_id}")
async def agregar_comida_a_menu(menu_id: str, comida_id: str, orden: int = None):
    """Agrega una comida a un menú"""
    # Verificar que existen el menú y la comida
    menu_existe = any(m.id_menu == menu_id for m in Menu_list)
    comida_existe = any(c.id_comida == comida_id for c in Comida_list)
    
    if not menu_existe:
        raise HTTPException(status_code=404, detail="Menú no encontrado")
    if not comida_existe:
        raise HTTPException(status_code=404, detail="Comida no encontrada")
    
    # Verificar que la relación no existe ya
    relacion_existe = any(
        r.menu_id == menu_id and r.comida_id == comida_id 
        for r in menu_comida_relations
    )
    if relacion_existe:
        raise HTTPException(status_code=400, detail="La comida ya está en este menú")
    
    # Si no se especifica orden, usar el siguiente disponible
    if orden is None:
        ordenes_existentes = [r.orden for r in menu_comida_relations if r.menu_id == menu_id]
        orden = max(ordenes_existentes, default=0) + 1
    
    # Crear la relación
    nueva_relacion = MenuComida(menu_id=menu_id, comida_id=comida_id, orden=orden)
    menu_comida_relations.append(nueva_relacion)
    
    return {"message": "Comida agregada al menú exitosamente", "relacion": nueva_relacion}

@router.delete("/menu/{menu_id}/comida/{comida_id}")
async def remover_comida_de_menu(menu_id: str, comida_id: str):
    """Remueve una comida de un menú"""
    # Buscar la relación
    for index, relacion in enumerate(menu_comida_relations):
        if relacion.menu_id == menu_id and relacion.comida_id == comida_id:
            del menu_comida_relations[index]
            return {"message": "Comida removida del menú exitosamente"}
    
    raise HTTPException(status_code=404, detail="Relación no encontrada")

@router.get("/menu/{menu_id}/informacion-nutricional")
async def get_informacion_nutricional_menu(menu_id: str):
    """Obtiene la información nutricional total de un menú"""
    comidas = await get_comidas_por_menu(menu_id)
    
    if not comidas:
        raise HTTPException(status_code=404, detail="No hay comidas en este menú")
    
    # Calcular totales nutricionales
    total_calorias = sum(comida["calorias"] for comida in comidas)
    total_proteinas = sum(comida["proteinas"] for comida in comidas)
    total_grasas = sum(comida["grasas"] for comida in comidas)
    total_carbohidratos = sum(comida["carbohidratos"] for comida in comidas)
    
    return {
        "menu_id": menu_id,
        "cantidad_comidas": len(comidas),
        "informacion_nutricional": {
            "calorias_totales": total_calorias,
            "proteinas_totales": round(total_proteinas, 2),
            "grasas_totales": round(total_grasas, 2),
            "carbohidratos_totales": round(total_carbohidratos, 2)
        },
        "comidas": [{"nombre": c["nombre"], "calorias": c["calorias"]} for c in comidas]
    }