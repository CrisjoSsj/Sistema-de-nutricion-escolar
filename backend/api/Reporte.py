from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(tags=["Reportes"])

class Reporte(BaseModel):
    id_reporte: int
    titulo: str
    fecha: str
    contenido: str

Reporte_list = [
    Reporte(id_reporte=1, titulo="Reporte de Nutrición - Enero", fecha="2024-01-31", contenido="Contenido del reporte de enero..."),
    Reporte(id_reporte=2, titulo="Reporte de Nutrición - Febrero", fecha="2024-02-28", contenido="Contenido del reporte de febrero...")
]

@router.get("/reportes", response_model=list[Reporte])
async def get_reportes():
    return Reporte_list

@router.get("/reporte/{id_reporte}", response_model=Reporte)
async def get_reporte(id_reporte: int):
    for reporte in Reporte_list:
        if reporte.id_reporte == id_reporte:
            return reporte
    raise HTTPException(status_code=404, detail="Reporte no encontrado")

@router.post("/reporte", response_model=Reporte)
async def create_reporte(reporte: Reporte):
    Reporte_list.append(reporte)
    return reporte

@router.put("/reporte/{id_reporte}", response_model=Reporte)
async def update_reporte(id_reporte: int, updated_reporte: Reporte):
    for index, reporte in enumerate(Reporte_list):
        if reporte.id_reporte == id_reporte:
            Reporte_list[index] = updated_reporte
            return updated_reporte
    raise HTTPException(status_code=404, detail="Reporte no encontrado")

@router.delete("/reporte/{id_reporte}")
async def delete_reporte(id_reporte: int):
    for index, reporte in enumerate(Reporte_list):
        if reporte.id_reporte == id_reporte:
            del Reporte_list[index]
            return {"message": "Reporte eliminado"}
    raise HTTPException(status_code=404, detail="Reporte no encontrado")
