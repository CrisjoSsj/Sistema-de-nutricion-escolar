from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_students():
    return {"message": "Lista de estudiantes"}

@router.post("/")
async def create_student():
    return {"message": "Estudiante creado"}